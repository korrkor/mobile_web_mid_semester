//window.location.reload();
function syncAjax(u) {
    var obj = $.ajax(
            {url: u,
                async: false
            }
    );
    return $.parseJSON(obj.responseText);

}

function check_save(name, email, number)
{
    var u = "event_action.php?cmd=1&name=" + name + "&email=" + email + "&number=" + number;
//     prompt("u",u);
    return syncAjax(u);
}

function save()
{
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var number = document.getElementById("number").value;
    var r = check_save(name, email, number);

    if (r.result === 1)
    {
        alert("successfully added");
    }

    else if (r.result === 0)
    {
        alert("sorry please try again");
    }

}



function admin_view()
{
    document.location.href = "admin_view.php";
}

function saveDone(data) {
    alert(data);
}


function check_login_admin(user_name,password)
{
    var u = ("event_action.php?cmd=3&user_name=" + user_name + "&password=" + password);
//    prompt("u",u);
    return syncAjax(u);
}

function login_admin()
{
    var user_name = document.getElementById("user_name").value;
    var password = document.getElementById("password").value;
    // Alter the URL: http://example.com/#foo => http://example.com/#bar
   
    var r = check_login_admin(user_name,password);

    if(r.result === 1)  
    { 
        
//        debugger;
         $.mobile.navigate( "#admin_view" );
    }
    
    else if(r.result===0)
    {
//            prompt("he");
        
        alert("login unsuccessful");  
    }

}

$(document).on("pagecreate", "#admin_view", function () {
//    alert("hrrerrrr");

    var r = syncAjax("event_action.php?cmd=2");

    for (var i in r)
    {
        var blogpost = '<div data-role="collapsible" data-collapsed="true"><h3>' + r[i].name + '</h3>'
                + '<p>Email: ' + r[i].email + '<br>Phone Number:'
                + r[i].number + '</p></div>';

        $('#participant').append(blogpost).trigger("create");
    }
});


//});