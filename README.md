rsweb.js
========

ResortSuite Web JavaScript Client

Overview
--------

The `src` directory contains the original source of the application. This should not be deployed. Instead, build a compressed version per the instructions below, and distribute that. The compressed version also has a number of template pre-processing steps applied, reducing startup time significantly.

The `lib` directory contains helper utilities for building the compressed app

The `bootstrap` directory contains a slightly-modified version of Twitter's Bootstrap files, which can be used to build a copy of `bootstrap.css` with custom colours.

You will need to create a `build` directory for the compressed app to be output into.

Building the Compressed App
---------------------------

### Pre-requisites

* You will need [node.js](http://nodejs.org/) installed, and correctly configured in your PATH so that you can run `node` without having to prefix its location. The installer from the website should get this going for you.

### Build Process

1.  Create the `build` directory in the root directory (the same level as the `src` directory). If it already exists, empty it.
2.  Open a command prompt and change into the root distribution directory
3.  Run `node lib/requirejs/bin/r.js -o app.build.js`
4.  If it completes without errors, then you will have a run-able built version in the build directory
    *   acceptable errors include the warning about not being able to inline the css import from fonts.googleapis.com
5. Clean up the build directory.
    *   By default the build process combines all of the JS *that it can find* into the rsweb.js file, but it also leaves a copy of those redundant files in the build directory. You can delete any of the files listed in the output of `node r.js`. You'll see what files have been combined like so:

            js/rsweb.js
            ----------------
            js/rsweb.js
            js/lib/order.js
            js/lib/jquery.js
            order!jquery
            js/lib/underscore.js
            order!underscore
            js/lib/event.js
            ...

        The above shows you that you can remove `order.js`, `jquery.js`, `underscore.js` and `event.js` from the build directory because the content of those files is already included in `rsweb.js`. (The list of files included in `rsweb.js` is much longer, this is just a sample.)
    *   Remove combined CSS files similarly to JS files above
    *   Copy user-configurable files over from `src`. (We want them legible, even at the expense of being slightly bigger and slower to load.)
    *   For reference, the clean tree looks like this:

            * build
                * css
                  * custom-theme
                    * images
                      ...
                    jquery.ui.1.8.16.ie.css
                  rsweb.css
                * img
                    banner-*.jpg
                    glyphicons-halflings.png
                    glyphicons-halflings-white.png
                    not-available.png
                    ResortSuiteWEB.png
                * js
                  * customization
                      Customization.js          (copy from src)
                  * lib
                      modernizr.js
                      require.js
                      respond.js
                      text.js
                  * localization
                    * en-us
                        Localization.js         (copy from src)
                        customerOverrides.js
                    * fr-ca
                        Localization.js         (copy from src)
                        customerOverrides.js
                    * es-sp
                        Localization.js         (copy from src)
                        customerOverrides.js
                  rsweb.js
                favicon.ico
                index.html
                legal.html

        If you carefully prune build using the output from `node r.js` you should end up with a deployable file structure as above. (Or, simply delete everything that's not shown in the file structure above, that's much faster.)
    *  There can be additional photos in the `img` folder, and if you don't change the default value in `Localization.js`, you'll also need a `legal.html` file as a sibling to `index.html`.

Customization for Clients
-------------------------

You will want to customize the look and feel of the app (namely the banner images and colour scheme) and review the settings available in `Customization.js`. There is one notable configuration-type option that lives in the respective `Localization.js` files, and this is `Localization.general.termsLink` which is the URL for the Terms and Conditions link (which may differ per language).

### Customizing the Images

Just replace the `banner-*.jpg` images in the `src/img` directory with customer-specific ones.

### Customizing the Colours

You can adjust the colours used by the Bootstrap UI in two ways: You can manually pick different colours to use and edit the `bootstrap/variables.less` file by hand, or you can use the [BootSwatchr](http://bootswatchr.com/create) site to preview your changes live. The installation process for BootSwatchr is slightly different than the manual process.

You can use [Crunch](http://crunchapp.net/) to convert `.less` files into `.css`

*   Manually Adjusting `variables.less`
    1.  Adjust Colours in `variables.less`
    2.  *Crunch* the `bootstrap.less` file.
    3.  Save the resulting `bootstrap.css` file into `src/css/bootstrap.css` (Backup the original `bootstrap.css`)

*   Using BootSwatchr
    1.  Adjust colours on BootSwatchr site (In Settings make sure to select version 2.0.4 of Bootstrap!)
    2.  Click the "Less" button at the top of the page (not in the sidebar)
    3.  Make a backup of `bootstrap/variables.less`
    4.  Create an empty `bootstrap/variables.less`
    5.  Save the file downloaded from BootSwatchr into the `bootstrap` directory and *Crunch* it (not `bootstrap.less`)
    6.  Save the resulting `bootstrap.css` file into `src/css/bootstrap.css` (Backup the original `bootstrap.css`)

If you referenced a custom font in your new bootstrap.css file, you will need to edit `src/css/rsweb.css` to include the font definition there. e.g.: add `@import url(http://fonts.googleapis.com/css?family=Lato:400,700);` if you changed sansFontFamily in Bootstrap to `Lato, "Helvetica Neue", Helvetica, Arial, sans-serif`

**Note:** If the app will be deployed on a SSL encrypted server, then you need to use `https://` instead of `http://` in the `@import url (...)` statement.

### Check and Build

Now you can check out your customizations by running the `src` version of the app. If everything looks good, then use the build steps above to create a distributable copy of the app. Remember, once built, the customer-specific colours are merged into the one `src/css/rsweb.css` file that is deployed.

Take care to back up and manage the different copies of `bootstrap.css` that you'll have so you can build a copy of the app for any client.  If you have a set of distributable files ready to go, you can just swap out the rsweb.css file that you built for each client. This might save you a little time versus pruning out the extraneous files from a full build tree, especially as all the other files should be identical.


**Note:** if any issues come up with build process try the below:
// run 'npm install -g requirejs' so requirejs is installed globally and running 'r.js -o app.build.js' works
// Commmand to clean build directory(from home directory): rm -rfv build/*
// Command to build the app into build directory(from within home directory): r.js -o app.build.js
