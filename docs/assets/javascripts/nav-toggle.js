// "Tout réduire / Tout développer" control for the sidebar tree.
// Applied via a `data-nav-force` attribute (see matching !important rules
// in extra.css) rather than the checkbox alone, since a section already
// toggled by hand doesn't respond to a plain checkbox change.
//
// What the control may touch depends on the viewport, because the sidebar
// itself does. At and above the lifted-nav breakpoint the theme hides
// every top-level item but the active one
// (.md-nav--lifted > .md-nav__list > .md-nav__item { display: none }),
// so the scope is that one tree, minus its own hidden label. Below it the
// drawer lists every top-level tree at once, so the scope is all of them
// — otherwise "Tout réduire" would silently skip whole branches, which is
// what it used to do on phones.
(function () {
  "use strict";

  // Matches the theme's lifted-nav breakpoint (76.25em).
  var LIFTED = "(min-width: 76.25em)";

  // Below this many collapsible items the control isn't worth its space:
  // shallow trees are readable as they are.
  var MIN_ITEMS = 3;

  // lucide chevrons-down-up (arrows meeting = collapse) and
  // chevrons-up-down (arrows parting = expand). Inlined because the
  // control is built in JS, well after the template icons are resolved.
  var ICONS = {
    collapse: '<path d="m7 20 5-5 5 5"/><path d="m7 4 5 5 5-5"/>',
    expand: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>'
  };

  function icon(name) {
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
      ICONS[name] +
      "</svg>"
    );
  }

  function toggleOf(item) {
    return item.querySelector(":scope > input.md-nav__toggle");
  }

  function init() {
    var nav = document.querySelector(".md-sidebar--primary nav.md-nav--primary");
    var rootList = nav && nav.querySelector(":scope > ul.md-nav__list");
    if (!rootList) {
      return;
    }

    // --nested, not --section: this build only marks the active top-level
    // item as a section, and the control needs every depth (e.g. "Python").
    var allItems = Array.prototype.filter.call(
      nav.querySelectorAll("li.md-nav__item--nested"),
      function (item) {
        return !!toggleOf(item);
      }
    );
    if (!allItems.length) {
      return;
    }

    // Every toggle starts with the indeterminate class in the raw markup,
    // so a never-touched section renders open while `.checked` is false —
    // and the first manual click would then read as "opened" when it in
    // fact closed the section. Normalise up front so `.checked` alone is
    // an honest record of what's open from here on.
    allItems.forEach(function (item) {
      var input = toggleOf(item);
      if (input && input.classList.contains("md-toggle--indeterminate")) {
        input.classList.remove("md-toggle--indeterminate");
        input.checked = true;
      }
    });

    var lifted = window.matchMedia(LIFTED);

    // The active tree, for the lifted layout. Falls back to --section for
    // pages where the theme marks one without marking it active.
    var activeRoot =
      rootList.querySelector(":scope > li.md-nav__item--active") ||
      rootList.querySelector(":scope > li.md-nav__item--section");

    function scope() {
      if (!lifted.matches) {
        return allItems;
      }
      if (!activeRoot) {
        return [];
      }
      // activeRoot itself is excluded: the lifted layout hides its label,
      // so collapsing it would empty the sidebar with nothing left to
      // click to bring it back.
      return Array.prototype.filter.call(
        activeRoot.querySelectorAll("li.md-nav__item--nested"),
        function (item) {
          return !!toggleOf(item);
        }
      );
    }

    // data-nav-force is what the stylesheet actually renders (it carries
    // !important), so where it's set it outranks the checkbox; elsewhere
    // the checkbox is the record. Reading only the checkbox let the label
    // drift from what the sidebar was showing.
    function isOpen(item) {
      if (item.dataset.navForce) {
        return item.dataset.navForce === "open";
      }
      var input = toggleOf(item);
      return !!input && input.checked;
    }

    function allExpanded(items) {
      return items.every(isOpen);
    }

    var button = document.createElement("button");
    button.type = "button";
    button.className = "md-nav-collapse-toggle";

    function setLabel(expanded) {
      var text = expanded ? "Tout réduire" : "Tout développer";
      button.innerHTML = icon(expanded ? "collapse" : "expand") + "<span>" + text + "</span>";
      button.setAttribute("aria-label", text + " les sections de navigation");
      button.setAttribute("title", text);
      button.dataset.expanded = expanded ? "true" : "false";
    }

    function setAll(expand) {
      scope().forEach(function (item) {
        // No dispatched "change" here — it would trip the listener
        // below and immediately clear the override just set.
        var input = toggleOf(item);
        if (input) {
          input.checked = expand;
        }
        item.dataset.navForce = expand ? "open" : "closed";
      });
      setLabel(expand);
    }

    var wrapper = document.createElement("div");
    wrapper.className = "md-nav-collapse-toggle__wrapper";
    wrapper.appendChild(button);

    // Re-read the tree: the label must never claim a state the sidebar
    // has since left, and the scope changes with the viewport.
    function refresh() {
      var items = scope();
      wrapper.hidden = items.length < MIN_ITEMS;
      if (items.length) {
        setLabel(allExpanded(items));
      }
    }

    button.addEventListener("click", function () {
      setAll(button.dataset.expanded !== "true");
    });

    // Manual click on an item hands it back to normal per-item control.
    nav.addEventListener("change", function (event) {
      var input = event.target;
      if (!input.classList || !input.classList.contains("md-nav__toggle")) {
        return;
      }
      var item = input.closest("li.md-nav__item--nested");
      if (item && item.dataset.navForce) {
        delete item.dataset.navForce;
      }
      refresh();
    });

    // Crossing the breakpoint swaps the drawer for the lifted sidebar,
    // and with it what the control is allowed to touch.
    if (lifted.addEventListener) {
      lifted.addEventListener("change", refresh);
    } else if (lifted.addListener) {
      lifted.addListener(refresh);
    }

    rootList.parentNode.insertBefore(wrapper, rootList);

    // Start expanded, and say so. navigation.expand already renders the
    // tree open, but it does that through the theme's indeterminate
    // toggles, which the theme itself rewrites on its own schedule — so
    // asserting the state here is the only way the control and the
    // sidebar are guaranteed to agree on the very first paint.
    setAll(true);
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
