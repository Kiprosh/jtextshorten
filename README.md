jtextshorten
============

**jtextshorten** is a simple text truncation plugin. jtextshorten will prevent text spilling over when applied to a large block of text. jtextshorten can be applied to spans containing best in place.

[Live demo!](http://kiprosh.github.io/jtextshorten/demo.html)

Usage
============

**Default Settings**

```
$('.jt-default').shortened();
```
By default, jtextshorten will truncate after 300 characters and add 'See more' and 'See less' links after truncation.

**Custom Settings**

```
$('.jt-limitchar').shortened({limitChars: 100});
```
In the example above, the character limit is overwritten from `300` to `100` and truncation is applied after it. You may change the settings at any time by passing an object to shortened.

Settings
============

* limitChars (*Default*: `300`) The number of characters to be displayed before truncating.
* moreText (*Default*: `See more`) The string value to be displayed for view more link.
* lessText (*Default*: `See less`) The string value to be displayed for view less link.