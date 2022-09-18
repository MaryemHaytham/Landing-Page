/**
 * dynamic creation of parts
 * simply adding them to the main tag and use the createSection method
 * ES6
 */
// repetition to indicate characteristics and section number
let repetition = 0;
const createSection = () => {
  repetition++;
  const content = `<section id="section${repetition}" data-nav="Section ${repetition}">
    <div class="landing__container">
    <h2>Section ${repetition}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>
    
    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
    </section>`;
  document.querySelector("main").insertAdjacentHTML("beforeend", content);
};
/**
 * By iterating, you may make the list items match the number of sections.
 * but I have to get rid of everything to stop the duplication.
 */
const navigationBar = document.getElementById("navigationBar__list");
const createNavItems = () => {
  navigationBar.innerHTML = "";
  document.querySelectorAll("section").forEach((section) => {
    const listItem = `<li><a href="#${section.id}" data-nav="${section.id}" class="menu__link">${section.dataset.nav}</a></li>`;
    navigationBar.insertAdjacentHTML("beforeend", listItem);
  });
};
/**
 *  which section on the viewport is specified, along with its link, by the function to watch the section
 *  loops through entries (sections)
 *  Get the active link using the section's viewport ID.
 *  add a class called "active" to the viewport section.
 *  to the section's URL, add the active class
 *  I manually update the location hash to avoid default behaviour.
 *  get rid of active classes
 * A DOMRect object that contains details about an element's size and position in relation to the viewport is returned by the Element.getBoundingClientRect() method.
 */

window.onscroll = function() {
	document.querySelectorAll("section").forEach(function(active) {
    let activeLink = navigationBar.querySelector(`[data-nav=${active.id}]`);
	if(active.getBoundingClientRect().top >= -400 && active.getBoundingClientRect().top <= 150){

    active.classList.add("your-active-class");
    activeLink.classList.add("active-link");

    }
    else{
         active.classList.remove("your-active-class");
         activeLink.classList.remove("active-link");
    }
	});
}
/**
 * Nav links will effortlessly take you to the appropriate section when you click them.
 * Using only CSS, I can shorten this code (html scroll-behavior: "smooth").
 * but I believe it's preferable to put what I learn to use.
 * I employ setTimeout to buy some extra time for fluid scrolling.
 */
navigationBar.addEventListener("click", (event) => {
  event.preventDefault();
  if (event.target.dataset.nav) {
    document
      .getElementById(`${event.target.dataset.nav}`)
      .scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      location.hash = `${event.target.dataset.nav}`;
    }, 200);
  }
});

/**
 * instead of using HTML, dynamically build four sections
 * build those links
 * Sections' ability to observe
 */
for (let i = 1; i < 5; i++) createSection();
createNavItems();

// Save the top-of-the-page icon and the header in variables.
const toTop = document.getElementById("to-top");
const header = document.querySelector(".page__header");

// When the icon is clicked, the document will seamlessly glide to the top.
toTop.addEventListener("click", () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
});
/**
 * after 800 pixels, the icon will display at the top.
 */
let isScrolling;
document.onscroll = () => {
  header.style.display = "block"
  clearTimeout(isScrolling)
   isScrolling = setTimeout(() => {
    header.style.display = "none";
  }, 4000);

  window.scrollY > 1500
    ? (toTop.style.display = "block")
    : (toTop.style.display = "none");
};



