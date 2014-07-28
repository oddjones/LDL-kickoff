LDL-kickoff
===========

A Codekit starter kit for LDL Digital Services

About the LDL-Kickoff Starter Kit
The starter kit is a "kickoff" scaffolding for Codekit, based around the "CODEKIT Kickoff" scaffolding produced by The Hive Media. It's job is to simplify and separate all the discrete elements we may use to put together a website into a kit of parts, speeding up design and development and reducing duplication and site bloat.

How does it work?
-----------------
A working knowledge of the basics of Codekit will help but the short answer is that Codekit compiles and minifies stuff for you. It uses the latest versions of compilers and minifiers for Javascript, SASS and LESS to turn a jigsaw puzzle of components into a folder structure of simple, clean HTML with compiled CSS and JS files ready to import straight into Umbraco.

How do I get started?
---------------------
The kickoff starter kit itself is expected to build over time as we add elements with each site we build. It will be hosted in github at https://github.com/oddjones/LDL-Kickoff. Kickoff is intended for use as a starter kit, so you should copy a new version of it for each new site you intend to create with it. The site will need to be set up as a virtual host in Apache (Setting up Apache on Mac OS X) with the root folder pointing to the "app" subfolder of your kickoff folder. If you're not comfortable with virtual hosts, then use VirtualHostX. You cannot use Codekit or LDL-Kickoff to build folders without using a web server. Once you have the site working on your Mac, then simply drag and drop the working folder onto codekit to create a new project.

How do I use it?
----------------
There will be pages (written by you hopefully!) devoted to every aspect of using LDL-Kickoff, but the basics are this. We are creating a library of re-usable and re-purposable "nuggets" of code. So every little piece of HTML you write, you should think "Can this be re-purposed?" - if so, save it as a discrete file. Codekit lets you build pages using a really simple "@include" directive - similar to an old-school ASP include file. If the snippet uses any specific (non-bootstrap) styles then they should be saved as a separate .scss (sass) file - these can be included into the global APP.scss file just the same as the snippet itself is included in the HTML.

What libraries and frameworks do we use?
----------------------------------------
We're starting kickoff as simply as possible - we just want to get it adopted and get comfortable with using it, so we're not making extensive use of SASS frameworks, grunt minifiers or what-have-you. Codekit is a single (Mac only) app which we install and configure to do the work for us. We make use of Bootstrap 3, which we keep up to date using the Bower package manager (installed with codekit). We're utilising jQuery 1.11.1 and jquery-migrate-1.2.1 (correct at time of writing: 24/7/2014) so as to stay as up-to-date as possible with the library whilst maintaining backwards compatibility for internal (IE8!) sites and applications. We make use of SASS rather than LESS (which requires us to use the SASS Bootstrap port) and Font Awesome for iconography (again kept up to date using Bower).
