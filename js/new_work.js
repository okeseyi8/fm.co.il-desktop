document.addEventListener("DOMContentLoaded", function() {
    
    let bodyconmenus = document.querySelectorAll(".menu-one");
    let secondBodyconmenus = document.querySelectorAll(".menu-two");
    let maxHeight = 0;
    let newmaxHeight = 0;

    var $draggableLink = $('.first_G, .second_g');
    var $dropZone = $('#drop-zone');
    const container = document.getElementById('drop-zone');
    var draggedElement;
    var path = 'images/stations/';
    var isLiked = false;
    var fav_cls = [];

    // Check if the cookie exists
    var cookieValue = getCookie("linksAndImagesCookie");
    var linksAndImages = cookieValue ? JSON.parse(cookieValue) : [];
    //For Height adjustment
    bodyconmenus.forEach(function(menu) {
        let height = menu.scrollHeight;
        if (height > maxHeight) {
            maxHeight = height + 30;
        }
    });
    bodyconmenus.forEach(function(menu) {
        menu.style.height = `${maxHeight}px`;
    });
    secondBodyconmenus.forEach(function(secondmenus) {
        let newheight = secondmenus.scrollHeight;
        if (newheight > newmaxHeight) {
            newmaxHeight = newheight + 40;
        }
    });
    secondBodyconmenus.forEach(function(secondmenus) {
        secondmenus.style.height = `${newmaxHeight}px`;     
    });

    // Fill linksAndImages with top ten links if it's empty
    if (linksAndImages.length === 0) {
        linksAndImages = [
        {"href":"glgltz.html","src":"images/stations/glgltz.png","alt":null},
        {"href":"kan-88.html","src":"images/stations/kan-88.png","alt":null},
        {"href":"galey-israel.html","src":"images/stations/galey-israel.png","alt":null},
        {"href":"kan-bet.html","src":"images/stations/kan-bet.png","alt":null},
        {"href":"radio-darom.html","src":"images/stations/radio-darom.png","alt":null},
        {"href":"kan-gimmel.html","src":"images/stations/kan-gimmel.png","alt":null},
        {"href":"eco99fm.html","src":"images/stations/eco99fm.png","alt":null},
        {"href":"100fm.html","src":"images/stations/100fm.png","alt":null},
        {"href":"102fm.html","src":"images/stations/102fm.png","alt":null},
        {"href":"103fm.html","src":"images/stations/103fm.png","alt":null}
        ];
        setCookie("linksAndImagesCookie", JSON.stringify(linksAndImages), 30);
        rebuildFavoritesContainer();
    }

    // Fixing the code to add a close button 'X' icon to the top edge of the image and handle its click event
    linksAndImages.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.style.width = '20px';
        link.style.height = '20px';

        const _li = document.createElement('li');
        _li.className = "grid-group-item";
        _li.style.zIndex = '5';

        const image = document.createElement('img');
        image.src = item.src;
        if (item.title != null) {
            image.title = item.title;
        } else {
            image.title = '';
        }
        if (item.alt != null) {
            image.alt = item.alt;
        } else {
            image.alt = '';
        }

        const close_btn = document.createElement('i');
        close_btn.className = "fa-solid fa-xmark"; // Use 'X' icon
        close_btn.style.position = 'absolute'; // Set position to absolute
        close_btn.style.top = '0'; // Align to top edge
        close_btn.style.right = '0'; // Align to right edge
        close_btn.style.cursor = 'pointer'; // Add cursor style
        close_btn.style.fontSize = '20px';
        close_btn.style.width = '20px';
        close_btn.style.height = '20px';
        close_btn.style.color = "#9B2A2A";
        close_btn.addEventListener('click', function(event) {
            event.preventDefault();
            removeLinkFromArray(link);
            console.log('close button clicked');
            removeLinkFromArray(link);
        });
        _li.appendChild(image);
        _li.appendChild(close_btn);
        link.appendChild(_li);

    });

    // $draggableLink.find('a').on('dragstart', function(onDragStart) {
    //     if (onDragStart.target.tagName.toLowerCase() === 'a') {
    //         draggedElement = onDragStart.target;
    //     } else {
    //         // If the dragged element is not a link, prevent the drag operation
    //         onDragStart.preventDefault();
    //     }
    // });

    // $dropZone.on('dragover', function(onDragOver) {
    //     onDragOver.preventDefault();
    //     $dropZone.css('background-color', 'grey');
    //     setTimeout(function() {
    //         $dropZone.css('background-color', '');
    //     }, 1000);
    // });

    // $dropZone.on('drop', function(onDrop) {
    //     onDrop.preventDefault();

    //     var elementToDrop = draggedElement;

    //     var l = elementToDrop.getAttribute('href');
    //     l = l.replace('.html', '');
    //     if (fav_cls.includes(l)) {
    //         return
    //     }

    //     // Check if the dragged element is a link
    //     if (draggedElement.tagName.toLowerCase() === 'a') {
    //         var imageUrl = '';
    //         var elementToDrop = draggedElement;

    //         var linkHref = elementToDrop.getAttribute('href');
    //         var linkAlt = elementToDrop.getAttribute('alt');
    //         imageUrl = path + convertToImageFormat(linkHref);
    //         // console.log(imageUrl);
    //         imageLinkToAdd = {
    //             href: linkHref,
    //             src: imageUrl,
    //             alt: linkAlt,
    //             title: elementToDrop.title
    //         };

    //         linksAndImages.push(imageLinkToAdd);
    //         draggedElement = null;

    //         // Update the UI
    //         rebuildFavoritesContainer();

    //         // Save the updated array into a cookie
    //         setCookie("linksAndImagesCookie", JSON.stringify(linksAndImages), 30); // Cookie expires in 30 days
    //         update_fav_btn();
    //     }
    // });

    function add_to_cookies(parentNode) {
        
        var imageUrl = parentNode.childNodes[1].src;
        // console.log(imageUrl)
        console.log(imageUrl);
        console.log("this is the image url");

        const startIndex = imageUrl.indexOf('/images/');
        if (startIndex !== -1) {
            const link = imageUrl.substring(startIndex);
            imageUrl = link
        }
        var linkHref = parentNode.childNodes[0].getAttribute('href');
        var linkAlt = parentNode.childNodes[1].getAttribute('alt');
        imageUrl = path + convertToImageFormat(linkHref);
        imageLinkToAdd = {
            href: linkHref,
            src: imageUrl,
            alt: linkAlt,
        };

        linksAndImages.push(imageLinkToAdd);
        // // Update the UI
        rebuildFavoritesContainer();

        // // Save the updated array into a cookie
        setCookie("linksAndImagesCookie", JSON.stringify(linksAndImages), 30);
    }

    function rebuildFavoritesContainer() {
        container.innerHTML = '';

        linksAndImages.forEach(item => {
            const link = document.createElement('a');
            link.href = item.href;
            link.style.position = "relative";

            const _li = document.createElement('li');
            // _li.style.width = '90px';
            _li.className = "grid-group-item";
            _li.style.zIndex = '100000';

            // item.style.position = 'relative';

            const image = document.createElement('img');
            image.src = item.src;
            image.alt = item.alt;
            image.title = item.title;

            const close_btn = document.createElement('i');
            close_btn.className = "fa-solid fa-xmark"; // Use 'X' icon
            close_btn.style.position = 'absolute'; // Set position to absolute
            close_btn.style.top = '-60px'; // Align to top edge
            close_btn.style.left = '0'; // Align to right edge
            close_btn.style.cursor = 'pointer'; // Add cursor style
            close_btn.style.fontSize = '20px';
            close_btn.style.width = '20px';
            close_btn.style.height = '20px';
            close_btn.style.zIndex = '6';
            close_btn.style.color = "#9B2A2A"
            close_btn.addEventListener('click', function(event) {
                // Do something when the close button is clicked
                event.preventDefault();
                removeLinkFromArray(link);
                // console.log(link)
                update_fav_btn()
                    // updateCookies();
                    // container.removeChild(link); 
                rebuildFavoritesContainer(); // Remove the link from the container
            });

            link.appendChild(image);
            link.appendChild(close_btn);
            _li.appendChild(link);
            container.appendChild(_li);
        });
    }

    function convertToImageFormat(filename) {
        // Replace '.html' with '.png'
        return filename.replace('.html', '.png');
    }

    function setCookie(cookieName, cookieValue, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
    }

    function getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) == 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }


    function insertimgsndicon() {
        const all_lis = document.getElementsByTagName("li");
        // const allLinks = document.getElementsByTagName("a");
        var td = []
        for (i = 0; i < all_lis.length; i++) {
            var htmlcol = all_lis[i].getElementsByTagName('a');
            var link = htmlcol[0];
            td.push(link);

        }

        for (let i = 4; i < td.length - 1; i++) {
            let hrefValue = td[i].getAttribute("href");
            
            // Remove ".html" from hrefValue and replace with ".png"
            hrefValue = hrefValue.replace(".html", ".png");
            var clsname = hrefValue.replace(".png", "");
            all_lis[i].className = clsname;
        
            let imgFile = "./images/stations/" + hrefValue;
        
            let img_fa = all_lis[i].childNodes;
            let img = img_fa[1].childNodes[1];
    
            let tempImg = new Image();
            tempImg.onload = function() {
            
                img.src = imgFile;
                img.style.width = '20px';
                img.style.height = '20px';
            };
            tempImg.onerror = function() {
            
                img.src = "./images/stations/default-img.png";
                img.style.width = '20px';
                img.style.height = '20px';
            };
            tempImg.src = imgFile;
        }
        
    }
    insertimgsndicon();

    function update_fav_btn() {
        var fav_cookie = getCookie("linksAndImagesCookie")
        var all_lis = document.getElementsByTagName("li");
        var data = fav_cookie

        const hrefRegex = /"href":"([^"]+)"/g;
        const hrefMatches = [];
        let match;
        while ((match = hrefRegex.exec(data)) !== null) {
            hrefMatches.push(match[1]);
        }
        // console.log(hrefMatches)
        cls = []
        for (i = 0; i < hrefMatches.length; i++) {
            cls.push(hrefMatches[i].replace(".html", ""));
            fav_cls.push(hrefMatches[i].replace(".html", ""));
        }
        for (i = 4; i < all_lis.length - 2; i++) {
            var heartImg = all_lis[i].getElementsByTagName("i")[0];
            if (cls.includes(all_lis[i].className)) {
                heartImg.classList.replace("fa-regular", "fa-solid");
            } else {
                heartImg.classList.replace("fa-solid", "fa-regular")
            }
        }
    }

    var test = getCookie("linksAndImagesCookie")

    update_fav_btn();

    function removeLinkFromArray(link) {

        let url = link.href;
        let lastSlashIndex = url.lastIndexOf('/');
        let lastHtmlIndex = url.lastIndexOf('.html');
        let res = '';
        let indexToRemove = -1;
        if (lastSlashIndex !== -1 && lastHtmlIndex !== -1) {
            let result = url.substring(lastSlashIndex + 1, lastHtmlIndex);
            res = result;
            console.log(result); // Output: kan-gimmel

        } else {
            console.log("URL format not recognized");
        }


        let listOfDictionaries = getCookie("linksAndImagesCookie") ? JSON.parse(getCookie("linksAndImagesCookie")) : [];
        listOfDictionaries.forEach((item, index) => {
            iten = item.href
            iten = iten.replace('.html', '');
            console.log(iten);
            if (res === iten) {
                indexToRemove
                console.log('it works');
                indexToRemove = index;
            }
        })

        listOfDictionaries.splice(indexToRemove, 1);
        console.log(listOfDictionaries);

        setCookie("linksAndImagesCookie", JSON.stringify(listOfDictionaries), 30);
        updateCookies();
        rebuildFavoritesContainer();
    }

    function updateCookies() {
        var cookieValue = getCookie("linksAndImagesCookie");
        linksAndImages = cookieValue ? JSON.parse(cookieValue) : [];
    };
    // Select all the icons on your website
    const icons = document.querySelectorAll('.fa-heart');
    // Loop through each icon and add an event listener
    icons.forEach(icon => {
    
        icon.addEventListener('click', function() {
            if (icon.classList.contains('fa-regular')) {
                add_to_cookies(icon.parentNode.childNodes[1]);
                icon.classList.replace('fa-regular', 'fa-solid');
                update_fav_btn()
                rebuildFavoritesContainer();
            } else {
                removeLinkFromArray(icon.parentNode.childNodes[1].childNodes[0]);
                icon.classList.replace('fa-solid', 'fa-regular');
                update_fav_btn()
                rebuildFavoritesContainer();
            }
        });
    });
    rebuildFavoritesContainer();
});
document.addEventListener('DOMContentLoaded', function() {
    new Sortable(document.getElementById('drop-zone'), {
        animation: 150,
        onEnd: function (evt) {
            // Capture the new order
            let newOrder = Array.from(document.querySelectorAll('.grid-item')).map(item => item.getAttribute('className'));
            console.log('New order:', newOrder);
         // Save the new order in a variable
            let orderVariable = newOrder;
            console.log('Saved order in variable:', orderVariable);

            // You can also store this in localStorage or send it to a server
            localStorage.setItem('savedOrder', JSON.stringify(orderVariable));
        }
    });
});