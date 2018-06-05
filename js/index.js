var clicked = false;
var mobileMenuClicked = false;//start off with overlay off

function menuClick() {
    if (mobileMenuClicked == true) {
        closeMobileMenu();
    } else {
        $('#mobileMenu').addClass('mobileMenuOpen');
        mobileMenuClicked = true;
        history.pushState(null, null, '#menu'); //set url extension
    }
};

//Close overlay function 
function closeMobileMenu(push) {
    if (mobileMenuClicked == true) {
        $('#mobileMenu').removeClass('mobileMenuOpen');
        mobileMenuClicked = false;
        if (push == undefined){
            history.back();
        }
    }
};

//Close overlay function
function closeOverlay(push) {
    if (clicked == true) {
        $('.overlay').removeClass('overlayOn');
        $("#overlayContent").html('');
        clicked = false;
        if (push == undefined){
            history.back();
        }
    }
};

//Close overlay function
function closeStaff() {
    $("#whoWeAreContent").html("<p style='animation-delay: 0.4s'>Apis is a Canberra based professional services firm specialising in strategic advisory and digital transformation services as well as hands-on solutions in delivery management, business analysis, digital design, complex procurement and program evaluation and review.  We are a firm of practitioners, known for cooperatively shaping and solving major initiatives, together with our government clients.</p><br><p style='animation-delay: 0.45s'  class='col-3'>Our purpose is to become partners and trusted advisors to our clients; to inspire our people to achieve their best in interesting and challenging environments; and to be pragmatic and agile in meeting our clients’ challenges.</p>");
    $('#whoWeAreContent').removeClass('staffInfoBox');
};

function closeBusinessLine() {
    $("#whatWeDoContent").html(" <p class='col-3'>Apis specialises in strategic advisory and digital transformation services as well as hands-on solutions in delivery management, business analysis and design, digital design, change and transformation, complex procurement and program evaluation and review.</p>");
    $('#whatWeDoContent').removeClass('businessLineInfoBox');
};




//load up Join Us content on button click
function joinClick(file) {
    if (clicked == true) {
        closeOverlay();
    } else {
        $('.overlay').addClass('overlayOn');
        clicked = true;
        $.ajax({
            url: "/html/ajax/" + file,
            success: function (result) {
                $("#overlayContent").html(result);
            }
        });
        history.pushState(null, null, '#JoinUs'); //set url extension
    }
};

//Load up staff profile when clicking on their photo
function staffClick(staff) {
        $('#whoWeAreContent').addClass('staffInfoBox');
        $('#whoWeAreContent').fadeOut(200, function(){
            $.ajax({
                url: "/html/ajax/staff/" + staff + ".html",
                success: function (result) {
                    $("#whoWeAreContent").html(result);
                }      
            });
            $('#whoWeAreContent').fadeIn(200);
        }); 
       


};

//Load up business line on click
function businessLineClick(businessLine) {
    $('#whatWeDoContent').addClass('businessLineInfoBox');
    $('#whatWeDoContent').fadeOut(200, function(){
        $.ajax({
            url: "/html/ajax/" + businessLine + ".html",
            success: function (result) {
                $("#whatWeDoContent").html(result);
            }
        });
        $('#whatWeDoContent').fadeIn(200);
    }); 
    
    
};


//Use ESC button for closing overlay
$(document).on('keydown', function (e) {
    if (e.keyCode === 27) { // ESC
        closeOverlay();
        closeMobileMenu();
    }
});

function disableScroll(){
    $.fn.fullpage.setMouseWheelScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
};


//Intercept back button for use with overlay
jQuery(document).ready(function ($) {

    if (window.history && window.history.pushState) {

        $(window).on('popstate', function () {
            closeOverlay(false);
            closeMobileMenu();
        });
    }
});



//randomise staff pick

function randomNoRepeats(array) {
    var copy = array.slice(0);
    return function() {
        if (copy.length < 1) { copy = array.slice(0); }
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index, 1);
        return item;
    };
}

var chooser = randomNoRepeats(['annya', 'anthony', 'belinda', 'danaye', 'dave', 'hassan', 'john', 'lizzie', 'mel', 'mike', 'neil', 'nigel', 'pete', 'shane', 'simone', 'tim', 'virginia']);
chooser();

jQuery(document).ready(function ($) {
    var staff = 6;
    for(var i=0; i < staff; i++){
        
        var staffName =chooser();
       
        var content = "<div style='animation-delay: 0.6s' class='staffBox' onclick='staffClick(&quot;" +staffName + "&quot;)'><img class='staffPhoto' src='/images/" + staffName + ".jpg'></div>";
        $(".staff").append(content);
    }
});


function joinUsOpen(clicked_id){
    $('.joinUsContent > .active').removeClass('active');
    var id_p = '#'+ document.getElementById(clicked_id).nextElementSibling.id;
    $(id_p).addClass('active');
}

function resizeTitle2(element){
    
    $(element + ' .titleBox').addClass('titleBoxLarge');
}

function resizeTitle(element){
    var id = element.get(0).id;
    console.log(id);
    $('#' + id + ' .titleBox').addClass('titleBoxLarge');
}