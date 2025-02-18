class ColorCycler {
    constructor() {
        this.baseColor = [0, 0, 0];
        this.increment = [0, 0, 0];
        this.isPlaying = false;
        this.initializeElements();
        this.setupEventListeners();
        this.startUpdateLoop();
    }

    initializeElements() {
        this.colorPreview = document.getElementById("colorPreview");
        this.toggleButton = document.getElementById("toggleButton");
        this.inputs = {
            base: ["r", "g", "b"].map((id) => document.getElementById(id)),
            increment: ["ir", "ig", "ib"].map((id) =>
                document.getElementById(id)
            ),
        };
    }

    setupEventListeners() {
        this.inputs.base.forEach((input, index) => {
            input.addEventListener("change", () => this.updateBaseColor(index));
        });

        this.inputs.increment.forEach((input, index) => {
            input.addEventListener("change", () => this.updateIncrement(index));
        });

        this.toggleButton.addEventListener("click", () =>
            this.toggleAnimation()
        );
    }

    updateBaseColor(index) {
        const value = this.validateColorValue(this.inputs.base[index].value);
        this.baseColor[index] = value;
        this.inputs.base[index].value = value;
        this.updateCSS();
    }

    updateIncrement(index) {
        const value = this.validateColorValue(
            this.inputs.increment[index].value
        );
        this.increment[index] = value;
        this.inputs.increment[index].value = value;
    }

    validateColorValue(value) {
        return Math.max(0, Math.min(255, parseInt(value) || 0));
    }

    toggleAnimation() {
        this.isPlaying = !this.isPlaying;
        this.toggleButton.textContent = this.isPlaying ? "Stop" : "Play";

        const root = document.documentElement;
        root.style.setProperty(
            "--animation-state",
            this.isPlaying ? "running" : "paused"
        );

        this.inputs.base
            .concat(this.inputs.increment)
            .forEach((input) => (input.disabled = this.isPlaying));
    }

    updateCSS() {
        const root = document.documentElement;
        const startColor = this.rgbToHex(this.baseColor);
        const endColor = this.rgbToHex(
            this.baseColor.map((base, i) => (base + this.increment[i]) % 256)
        );

        root.style.setProperty("--color-start", startColor);
        root.style.setProperty("--color-end", endColor);
    }

    rgbToHex(rgb) {
        return "#" + rgb.map((n) => n.toString(16).padStart(2, "0")).join("");
    }

    startUpdateLoop() {
        setInterval(() => {
            if (this.isPlaying) {
                this.baseColor = this.baseColor.map(
                    (value, index) => (value + this.increment[index]) % 256
                );

                this.inputs.base.forEach(
                    (input, index) => (input.value = this.baseColor[index])
                );

                this.updateCSS();
            }
        }, 250);
    }
}

document.addEventListener("DOMContentLoaded", () => new ColorCycler());
