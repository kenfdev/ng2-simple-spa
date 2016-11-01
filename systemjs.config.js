/**
 * PLUNKER VERSION (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0-rc.1'; // lock in the angular package version; do not let it float to current!

  //map tells the System loader where to look for things
  var  map = {
    '@angular':                   'https://unpkg.com/@angular', // sufficient if we didn't pin the version
    'rxjs':                       'https://unpkg.com/rxjs@5.0.0-beta.6',
    'ts':                         'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'https://unpkg.com/typescript@1.8.10/lib/typescript.js',
    '@angular2-material': 'https://unpkg.com/@angular2-material',
    'ng2-translate': 'https://unpkg.com/ng2-translate'
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'rxjs':                       { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    // 'router-deprecated',
    'upgrade',
  ];
  
  var mdPackageNames = [
    'core',
    'toolbar',
    'icon',
    'button',
    'sidenav',
    'list',
    'card',
    'input',
    'radio',
    'checkbox'
  ]

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages
  ngPackageNames.forEach(function(pkgName) {

    // Bundled (~40 requests):
    packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };

    // Individual files (~300 requests):
    //packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });
  
  // Add map entries for each angular material package
  // only because we're pinning the version with `mdVer`.
  mdPackageNames.forEach(function(pkgName) {
    map['@angular2-material/'+pkgName] = 'https://unpkg.com/@angular2-material/' + pkgName;
  });

  // Add package entries for angular material packages
  mdPackageNames.forEach(function(pkgName) {
    packages['@angular2-material/'+pkgName] = {
      format: 'cjs',
      defaultExtension: 'js', 
      main: pkgName + '.js'
    };
  });

  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    // transpiler: 'ts',
    // typescriptOptions: {
    //   tsconfig: true
    // },
    // meta: {
    //   'typescript': {
    //     "exports": "ts"
    //   }
    // },
    map: map,
    packages: packages
  }

  System.config(config);

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/