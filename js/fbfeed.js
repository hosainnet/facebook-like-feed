/**
 * Reused some code from http://bit.ly/h7qwfl
 */

jQuery.fn.fbfeed = function (options) {
    options = options || {};

    if (!options.id) {
        throw new Error('You need to provide an user/page id!');
    }
    //Facebook Graph API URLs
    var graphUSER = 'http://graph.facebook.com/' + options.id + '/?callback=?',
        graphPOSTS = 'https://graph.facebook.com/'+options.id+'/feed/?access_token='+
            options.access_token+'&callback=?&date_format=U';
    var graphPHOTO = 'https://graph.facebook.com/' + options.id + '/picture?access_token=' + options.access_token
    var feed = this;

    $.when($.getJSON(graphUSER), $.getJSON(graphPOSTS)).done(function (user, posts) {

        var fb = {
            user: user[0],
            posts: []
        };
        fb.user.picture = graphPHOTO;
        $.each(posts[0].data, function () {

            this.from.picture = graphPHOTO;
            this.created_time = relativeTime(this.created_time * 1000);
            this.message = urlHyperlinks(this.message);

            fb.posts.push(this);
        });

        $(feed).addClass('fbfeed')
        // Rendering the templates:
        $('#headingTpl').tmpl(fb.user).appendTo(feed);
        var ul = $('<ul>').appendTo(feed);
        $('#feedTpl').tmpl(fb.posts).appendTo(ul);
    });

    return this;

};

function urlHyperlinks(str) {
    return str.replace(/\b((http|https):\/\/\S+)/g, '<a href="$1" target="_blank">$1</a>');
}

function relativeTime(time) {

    // Adapted from James Herdman's http://bit.ly/e5Jnxe

    var period = new Date(time);
    var delta = new Date() - period;

    if (delta <= 10000) {	// Less than 10 seconds ago
        return 'Just now';
    }

    var units = null;

    var conversions = {
        millisecond: 1,		// ms -> ms
        second: 1000,		// ms -> sec
        minute: 60,			// sec -> min
        hour: 60,			// min -> hour
        day: 24,			// hour -> day
        month: 30,			// day -> month (roughly)
        year: 12			// month -> year
    };

    for (var key in conversions) {
        if (delta < conversions[key]) {
            break;
        }
        else {
            units = key;
            delta = delta / conversions[key];
        }
    }

    // Pluralize if necessary:

    delta = Math.floor(delta);
    if (delta !== 1) {
        units += 's';
    }
    return [delta, units, "ago"].join(' ');
};
