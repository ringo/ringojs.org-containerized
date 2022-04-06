#!/usr/bin/env ringo
/**
 * @fileoverview Script to create static JsDoc documentation.
 *      Use -h or --help to get a list of available options.
 *
 * @see http://code.google.com/p/jsdoc-toolkit/
 */

// stdlib
var system = require('system');
var files = require('ringo/utils/files');
var fs = require('fs');
var {Parser} = require('ringo/args');
var {ScriptRepository} = require('ringo-jsdoc');
var strings = require('ringo/utils/strings');
var objects = require('ringo/utils/objects');

var {Reinhardt} = require('reinhardt');
var templates = new Reinhardt({
    loader: './templates/',
    filters: require('./jsdocFilters')
});

var {repositoryList, moduleDoc, moduleList, structureModuleDoc, getRepositoryName} = require('./jsdocserializer');

var defaultContext = {
    "baseUri": "//ringojs.org"
};

/**
 * Renders jsdoc html files for the given repository into the given directory.
 *
 * @param {Object} repository
 * @param {String} directory
 */
var renderRepository = exports.renderRepository = function (repository, directory) {
    // need apps/jsdoc on path for skin extend to work
    if (require.paths.indexOf(module.directory) == -1) {
        require.paths.push(module.directory);
    }

    print ('Writing to ' + directory + '...');
    copyStaticFiles(directory);
    print ('Module index');
    writeRepositoryIndex(directory, repository);
    print(repository.path);
    writeModuleList(directory, repository);
    moduleList(repository).forEach(function(module) {
        print('\t' + module.name);
        writeModuleDoc(directory, repository, module);
    });

    print('Finished writing to ' + directory);
    return;
}

/**
 * Copy static files of this webapp to target directory
 *
 * @param {String} directory
 */
function copyStaticFiles(directory) {
    fs.makeTree(fs.join(directory, 'static'));
    fs.copyTree(fs.join(module.directory, 'static'), fs.join(directory, 'static'));
}

/**
 * Write the html file listing all modules to directory.
 *
 * @param {String} directory directory of html file to be written
 * @param {Object} repository repository descriptor
 */
function writeModuleList(directory, repository) {
    var context = objects.merge(defaultContext, {
        repositoryName: repository.name,
        title: 'Module Overview - ' + repository.name,
        modules: moduleList(repository, true),
        rootPath: './'
    });
    var moduleIndexHtml = (templates.getTemplate('moduleIndex.html')).render(context);
    fs.write(fs.join(directory, 'index.html'), moduleIndexHtml);
}

/**
 * Write html page documenting one module to the directory.
 *
 * @param {String} directory
 * @param {Object} repository repository descriptor
 * @param {Object} module module descriptor
 */
function writeModuleDoc(directory, repository, module){

    var moduleDirectory = directory;
    var modules = [];
    moduleDirectory = fs.join(directory, module.id);
    fs.makeTree(moduleDirectory);
    modules = moduleList(repository);

    var slashCount = strings.count(module.id, '/');
    var relativeRoot = '../' + strings.repeat('../', slashCount);

    function toLink(target) {
        // if link target roughly matches "foo/bar#xxx.yyy"
        // format as API reference link
        if (target.match(/^[\w\/\.#]+$/)) {
            var [module, hash] = target.split("#");
            if (!module) {
                return [target, target.slice(1)];
            } else {
                var href = relativeRoot + module + "/" + defaultContext.indexhtml;
                if (hash) href += "#" + hash;
                return [href, target.replace("#", ".")];
            }
        }
        return null;
    }

    var docs = moduleDoc(repository.path, module, toLink);
    if (docs == null) {
        throw new Error('Could not parse JsDoc for ' + repository.path + module.id);
    }

    var context = objects.merge(defaultContext, {
        rootPath: relativeRoot,
        repositoryName: repository.name,
        title: module.name + ' - ' + repository.name,
        moduleId: module.id,
        modules: modules,
        item: structureModuleDoc(docs),
        iterate: function(value) {
            return value && value.length ? {each: value} : null;
        },
        debug: function(value) {
            print(value.toSource());
            return null;
        },
        commaList: function(value) {
            return value && value.length ? value.join(', ') : '';
        }
    });

    var moduleHtml = (templates.getTemplate('module.html')).render(context);
    var moduleFile = fs.join(moduleDirectory, 'index.html');
    fs.write(moduleFile, moduleHtml);
}

function writeRepositoryIndex(directory, repository) {
    var modules = moduleList(repository).map(function(module) {
        module.data = structureModuleDoc(moduleDoc(repository.path, module));
        module.moduleName = module.name;
        return module;
    });

    var context = objects.merge(defaultContext, {
        rootPath: './',
        repositoryName: repository.name,
        title: 'Index: ' + repository.name,
        modules: modules
    });
    var indexHtml = (templates.getTemplate('repositoryIndex.html')).render(context);
    var indexFile = fs.join(directory, 'index_all.html');
    fs.write(indexFile, indexHtml);
}

/**
 * Create static documentation for a Repository.
 *
 *   ringo-doc -s /home/foo/ringojs/modules/
 *
 * You can specify a human readable name for the module which will
 * be display in the documentation:
 *
 *   ringo-doc -s /home/foo/ringojs/modules -n "Ringojs Modules"
 *
 * @param args
 */
function main(args) {

    /**
     * Print script help
     */
    function help() {
        print('Create JsDoc documentation for CommonJs modules.');
        print('Usage:');
        print('  ringo ' + script + ' -s [sourcepath]');
        print('Options:');
        print(parser.help());
    }

    var script = args.shift();
    var parser = new Parser();
    parser.addOption('s', 'source', 'repository', 'Path to repository');
    parser.addOption('d', 'directory', 'directory', 'Directory for output files (default: "out")');
    parser.addOption('t', 'templates', 'directory', 'Template directory');
    parser.addOption('n', 'name', 'name', 'Name of the Repository (default: auto generated from path)');
    parser.addOption('p', 'package', 'package.json', 'Use package manifest to adjust module names.')
    parser.addOption(null, 'file-urls', null, 'Add "index.html" to all URLs for file:// serving.');
    parser.addOption('h', 'help', null, 'Print help message and exit');

    var opts = parser.parse(args);
    if (opts.help) {
        help();
        return;
    }
    if (!opts.source) {
        throw new Error('No source specified.');
    }
    if (opts.templates) {
        templates = new Reinhardt({
            loader: opts.templates,
            filters: require('./jsdocFilters')
        });
    }

    if (opts.package) {
        // read package.json manifest
        var packageJson = fs.absolute(opts.package);
        var pkg = opts.package = require(packageJson);
        if (pkg.main) {
            // make main module absolute
            pkg.main = fs.absolute(fs.join(fs.directory(packageJson), pkg.main))
        }
    }

    var directory = fs.join(opts.directory || './out/');

    var repository = {
        path: opts.source,
        name: opts.name || getRepositoryName(opts.source),
        package: opts.package || {}
    };
    defaultContext.indexhtml = opts['fileUrls'] ? 'index.html' : '';

    // check if export dir exists & is empty
    var dest = new fs.Path(directory);
    if (dest.exists() && !dest.isDirectory()) {
        throw new Error(dest + ' exists but is not a directory.');
    } else if (dest.isDirectory() && dest.list().filter(name => name.indexOf(".") !== 0).length > 0) {
        throw new Error('Directory ' + dest + ' exists but is not empty');
    }

    if (!fs.isDirectory(repository.path)) {
        throw new Error('Invalid source specified. Must be directory.');
    }

    renderRepository(repository, directory, false);
}

if (require.main == module) {
    try {
        main(system.args);
    } catch (error) {
        print(error);
        print('Use -h or --help to get a list of available options.');
    }
}
