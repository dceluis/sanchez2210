import './tailwind.css';
import './styles.css';
import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Import and register all TailwindCSS Components
import { Toggle } from "tailwindcss-stimulus-components"
application.register('toggle', Toggle)
