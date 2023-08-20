(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  // Sticky Header
  $(window).scroll(function () {

    if ($(window).scrollTop() > $('#hero').height()) {
      $('.main_h').addClass('sticky');
    } else {
      $('.main_h').removeClass('sticky');
    }

  });

  // Mobile Navigation
  $('.mobile-toggle').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
      $('.main_h').removeClass('open-nav');
    } else {
      $('.main_h').addClass('open-nav');
    }
  });

  $('.main_h li a').click(function () {
    if ($('.main_h').hasClass('open-nav')) {
      $('.navigation').removeClass('open-nav');
      $('.main_h').removeClass('open-nav');
    }
  });

  $('nav a').click(function (event) {
    var id = $(this).attr("href");
    var offset = 70;
    var target = $(id).offset().top - offset;
    $('html, body').animate({
      scrollTop: target
    }, 500);
    event.preventDefault();
  });


  const heroHeight = document.getElementById("hero").offsetHeight;  // get the height of the hero section
  document.addEventListener('scroll', function () {
    const offsetY = window.pageYOffset;
    const birdWidth = document.querySelector('.seagull-layer img').offsetWidth;  // get the width of the bird image
    const birdMove = (offsetY / heroHeight) * (window.innerWidth + birdWidth);  // calculate the position
    document.querySelector('.seagull-layer').style.transform = `translateX(${birdMove}px)`;
    document.querySelector('.background-layer').style.transform = `translateY(${offsetY * 0.5}px)`;
    document.querySelector('.foreground-layer').style.transform = `translateY(${offsetY * 0.9}px)`;

    var scrollPosition = window.scrollY;
    var screenHeight = window.innerHeight;
    var opacityValue = Math.min(scrollPosition / screenHeight, 0.8); // The max value here is the ending opacity

    var gradientStyle = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, ${opacityValue}))`;
    document.querySelector('.foreground-layer').style.background = gradientStyle;

  });


  // CONTACT TYPER

  // This function is called whenever #contact becomes visible on the screen.
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.typing-demo').classList.add('start-typing');
        // Stop observing after the animation has started
        observer.unobserve(entry.target);
      }
    });
  }

  // Set up the intersection observer also under contact
  const options = {
    threshold: 0.1  // Start the animation when at least 10% of #contact is visible
  };
  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(document.getElementById('contact'));


  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });


  // for the work experiences

  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const highlight = document.querySelector('.highlight');

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      // Remove active states from other tabs & panels
      tabButtons.forEach(tab => tab.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      // Add active state to the clicked tab & corresponding panel
      btn.classList.add('active');
      tabPanels[index].classList.add('active');

      // Move the highlight to the clicked tab
      highlight.style.transform = `translateY(${btn.offsetTop}px)`;
    });
  });

  function addClass() {
    document.body.classList.add("sent");
  }

  sendLetter.addEventListener("click", addClass);


  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


