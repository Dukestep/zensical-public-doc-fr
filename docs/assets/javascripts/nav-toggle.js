// "Tout réduire / Tout développer" control for the "Données" and
// "Utilisation et tutoriels" sidebar trees — the only two deep enough to
// need it. Applied via a `data-nav-force` attribute (see matching
// !important rules in extra.css) rather than the checkbox alone, since a
// section already toggled by hand doesn't respond to a plain checkbox
// change.
(function () {
  "use strict";

  var SCOPED_SECTIONS = ["Données", "Utilisation et tutoriels"];

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

    // Every toggle starts with this class in the raw markup, so a
    // never-touched section reads as open even though .checked is false.
    function isOpen(item) {
      var input = item.querySelector(":scope > input.md-nav__toggle");
      return !!input && (input.checked || input.classList.contains("md-toggle--indeterminate"));
    }

    var link = document.createElement("button");
    link.type = "button";
    link.className = "md-nav-collapse-toggle";

    function setLabel(expanded) {
      link.textContent = expanded ? "Tout réduire" : "Tout développer";
      link.setAttribute("aria-label", link.textContent + " les sections de navigation");
      link.dataset.expanded = expanded ? "true" : "false";
    }

    function setAll(expand) {
      items.forEach(function (item) {
        // No dispatched "change" here — it would trip the listener
        // below and immediately clear the override just set.
        var input = item.querySelector(":scope > input.md-nav__toggle");
        if (input) {
          input.checked = expand;
          if (!expand) {
            input.classList.remove("md-toggle--indeterminate");
          }
        }
        item.dataset.navForce = expand ? "open" : "closed";
      });
      setLabel(expand);
    }

    link.addEventListener("click", function () {
      setAll(link.dataset.expanded !== "true");
    });

    // Manual click on an item hands it back to normal per-item control.
    rootItem.addEventListener("change", function (event) {
      var input = event.target;
      if (!input.classList || !input.classList.contains("md-nav__toggle")) {
        return;
      }
      var item = input.closest("li.md-nav__item--nested");
      if (item && item.dataset.navForce) {
        delete item.dataset.navForce;
      }
    });

    var anyCollapsed = items.some(function (item) {
      return !isOpen(item);
    });
    setLabel(!anyCollapsed);

    var wrapper = document.createElement("div");
    wrapper.className = "md-nav-collapse-toggle__wrapper";
    wrapper.appendChild(link);
    rootList.parentNode.insertBefore(wrapper, rootList);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
