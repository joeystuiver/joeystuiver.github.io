// Array of image URLs
const images = [
    'Content/Images/image3.png',
    'Content/Images/image2.png',
    'Content/Images/image1.png',
    'Content/Images/image4.jpeg', 
    'Content/Images/image5.jpeg', 
    'Content/Images/image7.jpeg'
];

let currentImageIndex = 0;
let nextImageIndex = 1;
const bg1 = document.getElementById('bg1');
const bg2 = document.getElementById('bg2');

// Preload images to avoid any delay during transition
function preloadImages() {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Function to swap images and fade them into each other
function changeHeaderBackground() {
    const currentBg = (currentImageIndex % 2 === 0) ? bg1 : bg2;
    const nextBg = (currentImageIndex % 2 === 0) ? bg2 : bg1;

    // Set the new image in the background that will fade in
    nextBg.style.backgroundImage = `url(${images[nextImageIndex]})`;
    
    // Fade in the next background and fade out the current one
    nextBg.style.opacity = 1;
    currentBg.style.opacity = 0;

    // Update indexes
    currentImageIndex = nextImageIndex;
    nextImageIndex = (nextImageIndex + 1) % images.length;
}

// Set initial background
bg1.style.backgroundImage = `url(${images[0]})`;
bg1.style.opacity = 1;

// Change the image every 7 seconds
setInterval(changeHeaderBackground, 7000);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.addEventListener('scroll', function() {
    const fadeText = document.querySelector('.centered-text'); // Select the text element
    const scrollY = window.scrollY; // Get the vertical scroll position

    // Adjust the opacity based on the scroll position
    const opacityValue = 1 - scrollY / 100; // Change '300' to control how quickly it fades
    fadeText.style.opacity = opacityValue < 0 ? 0 : opacityValue; // Ensure opacity doesn't go below 0
});

  // Array of GIFs to alternate
    const gifSources = [
        "Content/Images/gif1.gif",
        "Content/Images/gif2.gif"
    ];
    
    // Get the image element
    const gifElement = document.getElementById("alternating-gif");
    
    // Index to track the current GIF
    let currentGifIndex = 0;
    
    // Function to alternate GIFs
    function alternateGIF() {
        // Update index to the next GIF (loop back to 0 if at the end)
        currentGifIndex = (currentGifIndex + 1) % gifSources.length;
        // Set the new GIF source
        gifElement.src = gifSources[currentGifIndex];
    }
    
    // Set interval to alternate GIF every 3 seconds (3000 ms)
    setInterval(alternateGIF, 3000);

// Scroll-based fade-in effect for grid items
document.addEventListener('scroll', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    const scrollTrigger = window.innerHeight / 1.5; // Adjust this to change the trigger point

    gridItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < scrollTrigger) {
            item.classList.add('visible'); // Add class to make it fade in
        }
    });
});

 // Smooth scrolling functionality
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor click behavior

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Enable smooth scrolling
        });
    });
});

// Initialize EmailJS with your public key
(function() {
    emailjs.init({
        publicKey: "cd1YcCMJ3TTT7fAjO" // Replace with your actual public key
    });
})();

// Set up the form submission event
window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Send the form data using EmailJS
        emailjs.sendForm('service_jshqrig', 'template_9q7w3ad', this)
            .then(() => {
                alert('Message sent successfully!');
            }, (error) => {
                alert('Failed to send message. Please try again later.');
                console.log('FAILED...', error);
            });
    });
};

// Array of vids to alternate
const videoSources = [
    "Content/GIFs/1.mp4",
    "Content/GIFs/2.mp4",
    "Content/GIFs/3.mp4",
    "Content/GIFs/4.mp4",
    "Content/GIFs/5.mp4",
    "Content/GIFs/6.mp4",
    "Content/GIFs/7.mp4",
    "Content/GIFs/8.mp4",
    "Content/GIFs/9.mp4",
    "Content/GIFs/10.mp4",
    "Content/GIFs/11.mp4",
    "Content/GIFs/12.mp4",
    "Content/GIFs/13.mp4",
    "Content/GIFs/14.mp4",
    "Content/GIFs/15.mp4"
];

// Get all video elements
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3");
const video4 = document.getElementById("video4");

// Keep track of current video indices
let currentVideoIndex1 = 0;
let currentVideoIndex2 = 0;

// Function to pick a random video index
function getRandomVideoIndex(excludeIndex) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * videoSources.length);
    } while (randomIndex === excludeIndex);
    return randomIndex;
}

// Function to handle video alternation
function handleVideoTransition(currentVideo, nextVideo, currentIndex) {
    const nextVideoIndex = getRandomVideoIndex(currentIndex);
    
    // Update the source of the hidden video element
    const nextSource = nextVideo.querySelector("source");
    nextSource.src = videoSources[nextVideoIndex];
    nextVideo.load();

    // Wait for the new video to load and then start crossfade
    nextVideo.onloadeddata = () => {
        nextVideo.play();
        currentVideo.style.opacity = 0;
        nextVideo.style.opacity = 1;
    };

    return nextVideoIndex;
}

// Function to alternate top videos
function alternateTopVideo() {
    const currentVideo = currentVideoIndex1 % 2 === 0 ? video1 : video2;
    const nextVideo = currentVideoIndex1 % 2 === 0 ? video2 : video1;
    currentVideoIndex1 = handleVideoTransition(currentVideo, nextVideo, currentVideoIndex1);
}

// Function to alternate bottom videos
function alternateBottomVideo() {
    const currentVideo = currentVideoIndex2 % 2 === 0 ? video3 : video4;
    const nextVideo = currentVideoIndex2 % 2 === 0 ? video4 : video3;
    currentVideoIndex2 = handleVideoTransition(currentVideo, nextVideo, currentVideoIndex2);
}

// Set intervals for both video sections
setInterval(alternateTopVideo, 2500);
setInterval(alternateBottomVideo, 2500);