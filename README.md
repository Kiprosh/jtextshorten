jtextshorten
============

**jtextshorten** is a simple text truncation plugin. jtextshorten will prevent text spilling over when applied to a large block of text.jtextshorten can be applied to spans containing best in place.

Usage
============

**Default Settings**

```
<pre>
  <div>$('.jt-default').shortened();</div>
</pre>
```
By default, jtextshorten will truncate after 300 characters.

Settings
============

* limitChars (*Default*: `300`) The number of characters to be displayed before truncating.
* lessText (*Default*: `See less`) The string value to be displayed for view less link.
* moreText (*Default*: `See more`) The string value to be displayed for view more link.

[Live demo!](http://kiprosh.github.io/jtextshorten/demo.html)
