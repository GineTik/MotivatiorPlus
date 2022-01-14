window.onload = function() {
    document.querySelector(".menu-btn").onclick = function() {
        var header_content = document.querySelector(".header-content");
        var left_header = document.querySelector(".left-header");
        left_header.classList.toggle("active");

        var menu_icon = document.querySelector("ion-icon[name*='menu']");
        var close_icon = document.querySelector("ion-icon[name*='close']");

        if (classIsFind(left_header, "active")) {
            header_content.style.visibility = "visible";
            menu_icon.style.display = "none";
            close_icon.style.display = "block";
        }
        else {
            header_content.style.visibility = "hidden";
            menu_icon.style.display = "block";
            close_icon.style.display = "none";
        }

    }
}

function classIsFind(elem, className) {
    return elem.classList.contains(className);
}

window.onresize = function() {
    var header_content = document.querySelector(".header-content");
    var left_header = document.querySelector(".left-header");
    if (document.body.clientWidth > 744) {
        header_content.style.visibility = "visible";
    } else if (!classIsFind(left_header, "active")) {
        header_content.style.visibility = "hidden";
    }
}