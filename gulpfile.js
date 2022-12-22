const { src, dest, watch, series, parallel } = require('gulp'); /** node_modules/gulp/index.js */ /** src = source - buscar un archivo. dest = Almacenar un archivo. */

/** Compilar CSS */
const sass = require('gulp-sass')(require('sass'));

/** Minificar Imágenes */
const imagemin = require('gulp-imagemin');

const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano');
const notify = require('gulp-notify');
const cache = require('gulp-cache');
const webp = require('gulp-webp');


function css(done) {
    /** 1) Identificar el archivo principal 
     * Entonces digamos que va a ir en serie, realiza una tarea y después se va al siguiente pipe() y una vez que finaliza podemos tener otro pipe().
    */
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) /** 2) Compilar SASS */
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css')) /** 3) Exportarlo o guardarlo en una ubicación */

    done();
}

function imagenes(done) {
    /** 1) Identificar archivo con imágenes */
    src('src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3}))) /** 2) Compilar */
        /** .pipe(imagemin({ optimizationLevel: 5 })) */
        .pipe(dest('build/img')) /** 3) Exportarlo o guardarlo en una ubicación */
        .pipe(notify({ message: 'Imagen Completada'})); 
    done();
}

function versionWebp() {
    return src('src/img/**/*')
        .pipe( webp() )
        .pipe(dest('build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}

function dev() {
    /** Puedo poner watch() (nombre de la función que estoy importando) y toma dos parámetros. 1) Archivo que vamos a estar revisando por cambios. 2) Si hay cambios en este archivo, tenemos ya una función que compila SASS. Por lo tanto, manda llamar la función de CSS.*/
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    watch('src/img/**/*', versionWebp);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = parallel( imagenes, versionWebp, css, dev );