    /*
    https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
    https://i.ytimg.com/vi_webp/JBEdgsea9sM/maxresdefault.webp
    https://i.ytimg.com/vi/mZ-crmiQ7is/maxresdefault.jpg


    https://img.youtube.com/vi_webp/mZ-crmiQ7is/maxresdefault.webp
    https://img.youtube.com/vi/mZ-crmiQ7is/maxresdefault.jpg


    --------------------


    Each YouTube video has four generated images. 

    They are predictably formatted as follows:

default thumbnail list:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/1.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/2.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/3.jpg
    
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres1.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres2.jpg
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxres3.jpg
    


    The first one in the list is a full size image and others are thumbnail images. The default thumbnail image (i.e., one of 1.jpg, 2.jpg, 3.jpg) is:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/default.jpg

    For the high quality version of the thumbnail use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/hqdefault.jpg

    There is also a medium quality version of the thumbnail, using a URL similar to the HQ:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/mqdefault.jpg

    For the standard definition version of the thumbnail, use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/sddefault.jpg

    For the maximum resolution version of the thumbnail use a URL similar to this:
    https://img.youtube.com/vi/<insert-youtube-video-id-here>/maxresdefault.jpg
    */

$(document).ready(function () {

    /**重置*/
    function reset() {

        $('input[type="text"], textarea').val("");
        $('.result-area').css("display", "none");
        $('.output-link').prop('href', "");
        $('#files-type').val("webp");
        $('#files-size').val("maxres");
    }

    /**取得封面圖片網址*/
    function getImgURL(ytURL) {

        if (!ytURL) {
            return;
        }


        let ytID;
        let filestype = $('#files-type').val();
        let filessize = $('#files-size').val();
        let maxresURL;

        console.log("YouTube URL: ", ytURL);

        if (ytURL.includes("watch") && ytURL.includes("list")) {

            /*LIST URL*/
            console.log("LIST URL");

            ytID = $('#yt-address').val().split('watch?v=')[1].split('&list')[0];

            console.log("YouTube ID: ", ytID);

        } else if (ytURL.includes("watch") && !ytURL.includes("list")) {

            /*Normal URL*/
            console.log("Normal URL");

            if (ytURL.includes("&t=")) {
                ytID = $('#yt-address').val().split('watch?v=')[1].split('&t=')[0];
            } else {
                ytID = $('#yt-address').val().split('watch?v=')[1];
            }


            console.log("YouTube ID: ", ytID);

        } else if (ytURL.includes("youtu.be")) {

            /*Short URL*/
            console.log("Short URL");

            if (ytURL.includes("?t=")) {
                ytID = $('#yt-address').val().split('youtu.be/')[1].split('?t=')[0];
            } else {
                ytID = $('#yt-address').val().split('youtu.be/')[1];
            }

            console.log("YouTube ID: ", ytID);

        }

        let urltype;
        let sizetype;
        if (filestype == "webp") {
            urltype = "vi_webp";
        } else if (filestype == "jpg") {
            urltype = "vi";
        }

        switch (filessize) {
            case "default":
                sizetype = "default";
                break;

            case "hq":
                sizetype = "hqdefault";
                break;

            case "mq":
                sizetype = "mqdefault";
                break;

            case "sd":
                sizetype = "sddefault";
                break;

            case "maxres":
                sizetype = "maxresdefault";
                break;

            default:
        }

        maxresURL = "https://i.ytimg.com/" + urltype + "/" + ytID + "/" + sizetype + "." + filestype;


        $('.result-area').css("display", "flex");
        $('#output-maxres').val(maxresURL);
        $('#output-link-maxres').prop('href', maxresURL);
        $('#output-img-maxres').prop('src', maxresURL);

        const img = new Image();
        img.src = maxresURL;
        img.onload = function () {
            let maxresW = this.width;
            let maxresH = this.height;
            console.log(maxresW + ' x ' + maxresH);
            $('#maxres-size').text(filessize + " size : " + maxresW + ' x ' + maxresH);
        };
    }

    /**產生圖片EVENT*/
    $('#ok').on('click', function () {
        getImgURL($('#yt-address').val());
    });
    $('#files-type, #files-size').on("change", function () {
        getImgURL($('#yt-address').val());
    });
    $('#example label').on('click', function () {
        $('#yt-address').val($(this).text());
        getImgURL($(this).text());
    });

    /**RESET BTN*/
    $('#reset').on('click', function () {
        reset();
    });

    /**欄位自動全選*/
    $("input, textarea").blur(function () {
        if ($(this).attr("data-selected-all")) {
            $(this).removeAttr("data-selected-all");
        }
    });
    $("input, textarea").click(function () {
        if (!$(this).attr("data-selected-all")) {
            try {
                $(this).selectionStart = 0;
                $(this).selectionEnd = $(this).value.length + 1;
                //add atribute allowing normal selecting post focus
                $(this).attr("data-selected-all", true);
            } catch (err) {
                $(this).select();
                //add atribute allowing normal selecting post focus
                $(this).attr("data-selected-all", true);
            }
        }
    });


});
