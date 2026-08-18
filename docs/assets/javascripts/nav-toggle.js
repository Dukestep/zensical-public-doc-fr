// "Tout réduire / Tout développer" control for the "Données" and
// "Utilisation et tutoriels" sidebar trees — the only two deep enough to
// need it. Applied via a `data-nav-force` attribute (see matching
// !important rules in extra.css) rather than the checkbox alone, since a
// section already toggled by hand doesn't respond to a plain checkbox
// change.
(function () {
  "use strict";

  var SCOPED_SECTIONS = ["Données", "Utilisation et tutoriels"];

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

  function init() {
    var nav = document.querySelector(".md-sidebar--primary nav.md-nav--primary");
    var rootList = nav && nav.querySelector(":scope > ul.md-nav__list");
    if (!rootList) {
      return;
    }

    var rootItem = rootList.querySelector(":scope > li.md-nav__item--section");
    var rootToggle = rootItem && rootItem.querySelector(":scope > input.md-nav__toggle");
    if (!rootItem || !rootToggle) {
      return;
    }

    var rootLink = rootItem.querySelector(".md-nav__container a");
    var sectionName = rootLink ? rootLink.textContent.trim() : "";
    if (SCOPED_SECTIONS.indexOf(sectionName) === -1) {
      return;
    }

    // --nested, not --section: only a tab's top-level children carry
    // --section, and this needs every depth (e.g. "Python").
    var items = Array.prototype.filter.call(
      rootItem.querySelectorAll("li.md-nav__item--nested"),
      function (item) {
        return !!item.querySelector(":scope > input.md-nav__toggle");
      }
    );
    if (!items.length) {
      return;
    }

    function toggleOf(item) {
      return item.querySelector(":scope > input.md-nav__toggle");
    }

    // Every toggle starts with the indeterminate class in the raw markup,
    // so a never-touched section renders open while `.checked` is false —
    // and the first manual click would then read as "opened" when it in
    // fact closed the section. Normalise up front so `.checked` alone is
    // an honest record of what's open from here on.
    items.forEach(function (item) {
      var input = toggleOf(item);
      if (input && input.classList.contains("md-toggle--indeterminate")) {
        input.classList.remove("md-toggle--indeterminate");
        input.checked = true;
      }
    });

    function allExpanded() {
      return items.every(function (item) {
        var input = toggleOf(item);
        return !!input && input.checked;
      });
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
      items.forEach(function (item) {
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

    button.addEventListener("click", function () {
      setAll(button.dataset.expanded !== "true");
    });

    // Manual click on an item hands it back to normal per-item control,
    // and re-reads the tree so the label never claims a state the
    // sidebar has since left.
    rootItem.addEventListener("change", function (event) {
      var input = event.target;
      if (!input.classList || !input.classList.contains("md-nav__toggle")) {
        return;
      }
      var item = input.closest("li.md-nav__item--nested");
      if (item && item.dataset.navForce) {
        delete item.dataset.navForce;
      }
      setLabel(allExpanded());
    });

    setLabel(allExpanded());

    var wrapper = document.createElement("div");
    wrapper.className = "md-nav-collapse-toggle__wrapper";
    wrapper.appendChild(button);
    rootList.parentNode.insertBefore(wrapper, rootList);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
