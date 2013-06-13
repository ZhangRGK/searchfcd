$(function () {
    window.books = [];
    window.keywords = '';
    initData();
    
    $(window).resize(function () {
        $("#topbtn").css({
            "top": $(window).height() / 3 * 2,
            "left": $(window).width() / 3 * 2
        });
    });
    //事件
    $("#search_btn").click(searchEvent);
    $("#search_input").keypress(function (e) {
        if (e.keyCode == 13) {
            searchEvent();
        }
    });
    
    $("#topbtn").click(function () {
        $("body").animate({scrollTop: 0}, 200);
    })
});

//方法
function searchEvent() {
    var bookStr = '';
    var ranNum = Math.floor(($(window).height() - 150) / 109);
    $(".topic").addClass("none");
    var querystr = $("#search_input").val();
    if (querystr == "") {
        clearList();
        randomBook(ranNum);
    } else {
        querystr = querystr.replace(/ /, "+");
        window.keywords = querystr.split("+");
        var result = search(window.keywords);
        clearList();
        if (result[1].length == 0) {
            $("#booklist").append("<div class='record'><div class='title'>_(:з」∠)_ </div><div class='info'>什么也没搜到,本搜索也只能帮你到这了...</div></div>");
        }
        for (var i = result.length - 1; i > 0; i--) {
            for (var j in result[i]) {
                var book = result[i][j];
                bookStr += createBookRecord($(book).attr("name"), $(book).attr("size"), $(book).attr("type"), $(book).attr("modifyDate"), $(book).text());
            }
        }
        appendBook(bookStr);
    }
}

function replaceKeywords(bookname, keywords) {
    for (var i in keywords) {
        var keyword = keywords[i];
        bookname = bookname.replace(keyword, "{lol~{" + keyword + "}~lol}");
    }
    bookname = bookname.replace('{lol~{','<span class="keyword">');
    bookname = bookname.replace('}~lol}','</span>');
    return bookname;
}

function search(keywords) {
    //空格 与 "+" 等同
    var result =[];   //二维数组结果集
    var t =[];
    for (var b in books) {
        t.push(books[b]);
    }
    result[0] = t;
    for (var i = 0; i < keywords.length; i++) {
        var keyword = keywords[i];
        var temp = [];
        for (var j = 0; j < result[i].length; j++) {
            var book = result[i][j];
            if ($(book).attr("name").indexOf(keyword) >= 0) {
                temp.push(book);
                result[i].splice(j, 1);
            }
        }
        result[i + 1] = temp;
    }
    return result;
}

function initData() {
    $.ajax({
        url: "book.xml",
        dataType: 'xml'
    }).done(function (data) {
            var jqueryObject = $(data);
            var bookList = jqueryObject.children();
            bookList.find("book").each(function () {
                books.push($(this));
            });
        });
}

function clearList() {
    $("#booklist").empty();
}

function randomBook(times) {
    var bookHtml = '';
    var bookStr = '';
    for (var i = 0; i < times; i++) {
        var book = books[Math.floor(Math.random() * books.length)];
        bookStr = createBookRecord($(book).attr("name"), $(book).attr("size"), $(book).attr("type"), $(book).attr("modifyDate"), $(book).text());
        bookHtml += bookStr;
    }
    appendBook(bookHtml);
}

function appendBook(bookdom) {
    $("#booklist").append(bookdom);
}

function createBookRecord(bookname, size, type, modifyDate, location) {
    bookname = replaceKeywords(bookname, window.keywords);
    var str = "<div class='record'>" +
        "<div class='title'>" + bookname + "<span class='size'>" + calcSize(size) + "</span></div> " +
        "<div class='tips'>" +
        "<span>" + type + "</span><span>" + modifyDate + "</span>" +
        "</div>" +
        "<div class='info'>" +
        location +
        "</div>" +
        "</div>";
    return str;
}

function calcSize(size) {
    var unitArray = [" B", " KB", " MB", " GB"];
    var index = 0;
    while (size > 1024) {
        size = (size / 1024).toFixed(2);
        index++;
    }
    return size + unitArray[index];
}

