const URL = "https://animechan.vercel.app/api/quotes/anime?title=";


// ELEMENT REFERENCES jQuery variables
const $form = $('form');
const $input = $('input[type="text"]');
let song = document.getElementById("song");
let randomQuoteIndex;
let previousGuesses = [];
let guessAmount = 1;
let previousGuessesEl = document.getElementById("previousGuesses");
let wins = 0;
let songs = [
    {
        song: 'songs/one_piece.mp3',
        anime: 'One Piece'
    },
    {
        song: 'songs/soul_eater.mp3',
        anime: 'Soul Eater'
    },
    {
        song: 'songs/Bleach.mp3',
        anime: 'Bleach'
    },
    {
        song: 'songs/overlord.mp3',
        anime: 'Overlord'
    },
    {
        song: 'songs/tokyo_ghoul.mp3',
        anime: 'Tokyo Ghoul'
    },
    {
        song: 'songs/Code_Geass.mp3',
        anime: 'Code Geass'
    },
    {
        song: 'songs/Death_Parade.mp3',
        anime: 'Death Parade'
    },
    {
        song: 'songs/Fairy_Tail.mp3',
        anime: 'Fairy Tail'
    },
    {
        song: 'songs/Gurren_Lagann.mp3',
        anime: 'Gurren Lagann'
    },
    {
        song: 'songs/Haikyu.mp3',
        anime: 'Haikyuu' 
    },
    {
        song: 'songs/Kono_Subarashi.mp3',
        anime: 'Konosuba'
    },
   
    {
        song: 'songs/Magi.mp3',
        anime: 'Magi'
    },
    {
        song: 'songs/Naruto.mp3',
        anime: 'Naruto'
    },
    {
        song: 'songs/oregairu.mp3',
        anime: 'Oregairu'
    },
    {
        song: 'songs/Stein_Gate.mp3',
        anime: 'Steins Gate'
    },
    {
        song: 'songs/Vinland_saga.mp3',
        anime: 'Vinland Saga'
    },

];

let secretAnime = newAnime();

function playSong() {
    console.log("playing song");
    song.setAttribute("src", secretAnime.song);
    console.log(song)
    song.play();
}

function pause() {
    song.pause();
}


// EVENT LISTENERS

$form.on('submit', handleGuess)


// FUNCTIONS
function handleGuess(event) {

    event.preventDefault()
    const userInput = $input.val();
    previousGuesses.push(userInput);

    if (guessAmount < 3) {
        previousGuessesEl.innerHTML = previousGuesses.join(', ');
        console.log(previousGuesses)

        guessAmount += 1;
        console.log("current guessAmount " + guessAmount)
        $('#namanyay-search-box').val('');

        if (userInput.toLowerCase().replace(/ /g,"") === secretAnime.anime.toLowerCase().replace(/ /g,"")) {
            song.pause()
            console.log("YOU WON!!")
            quote = secretAnime.quote;
            wins+=1;
            $('#namanyay-search-box').val('');

            let html;

            if (secretAnime.quote != undefined) {
                html = "<video src='videos/yes.mp4' width='75%' height='75%' autoplay webkit-playsinline playsinline></video> <p>" + "Score: " + " " + wins +"</p>";
            }
            else {
                html = "<video src='videos/yes.mp4' width='75%' height='75%' autoplay webkit-playsinline playsinline></video>";
            }
            Swal.fire({
                
                html: html,
                icon: 'success',
                confirmButtonText: 'Play Again',
                background: 'black',
            }).then(function () {
            refresh();
            })
            

            console.log("Current score: " + wins );

        }


    }
    else {
        // you lost message

        console.log("YOU LOST!!")
        song.pause()

        Swal.fire({

            html: "<video src='videos/no.mp4' width='60%' height='60%' autoplay webkit-playsinline playsinline></video> <p margin = '5px 5px 5px 5px'>ANIME: " + secretAnime.anime + "</p>" +"<p margin = '5px 5px 5px 5px' style='white-space: pre-line;'> SCORE: " + wins + "</p>",
            icon: 'error',
            confirmButtonText: 'Play Again',
            background: 'black',
        }).then(function () {
            location.reload();
        })

        console.log("Last score: " + wins)
        wins = 0;
    }
}


function newAnime(){

    randomSongIndex = Math.floor(Math.random() * (songs.length));
    let anime = songs[randomSongIndex];


    $.ajax(URL + anime.anime).then(function (response) {
        randomSongIndex = Math.floor(Math.random() * (response.length - 1));
        console.log('Quote data is ready')
        let quote = response[randomSongIndex].quote
        anime.quote = quote;
    }, function (error) {
        console.log('something is wrong')
        console.log(error)
    })
    
    console.log("secret Anime is ")
    console.log(anime)

    return anime;
}

function refresh(){
    secretAnime = newAnime()
    previousGuesses = []
    previousGuessesEl.innerHTML = "";
    $("#search").val('')
    $("#gif").attr("style", "visibility: hidden")
    guessAmount = 1;
    $("#playButton").attr('src', "img/play.png");
}



