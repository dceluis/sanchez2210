import './tailwind.css';
import { Application } from "@hotwired/stimulus";
import { Toggle } from "tailwindcss-stimulus-components";

const application = Application.start();

application.register('toggle', Toggle);

// updated projecthover controller for popup modal functionality using a pre-rendered modal element
import { Controller } from "@hotwired/stimulus";

class ProjectHoverController extends Controller {
  static targets = ["modal"];

  connect() {
    console.log("projecthover controller connected");
  }

  openModal(event) {
    event.preventDefault();
    this.modalTarget.classList.remove("hidden");
    const video = this.modalTarget.querySelector("video");
    if (video && video.dataset.src) {
      video.src = video.dataset.src;
    }
  }

  closeModal(event) {
    event.preventDefault();
    this.modalTarget.classList.add("hidden");
    const video = this.modalTarget.querySelector("video");
    if (video) {
      video.src = ""; // Stop loading by clearing src
      video.pause();  // Pause playback if active
    }
  }
}
application.register('project-hover', ProjectHoverController);
