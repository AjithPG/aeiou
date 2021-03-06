import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@kuscamara/code-sample/code-sample.js';
//import '@google/model-viewer';

class MyNew extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
				:host {
					display: block;
					--paper-tabs-selection-bar-color: var(--accent-color);
				}
				.help {
					padding: 32px;
					border-radius: 8px;
					border: 2px dashed #b2b2b2;
				}
				paper-tabs {
					height: 100%;
					background-color: var(--paper-grey-100);
				}
				paper-tab:hover {
					--paper-tab-content-unselected: {
						opacity: 1;
					}
				}
				paper-tab {
        	font-family: "Prompt", "Roboto", "Noto", sans-serif;
					text-transform: capitalize;
					padding: 0;
					font-size: 18px;
					font-weight: 600;
					padding: 16px;
				}
				paper-tab a {
					@apply --layout-horizontal;
					@apply --layout-center-center;
				}
				paper-tab.iron-selected {
					color: var(--accent-color);
				}
				h1 {
					font-size: 48px;
					text-align: center;
				}
				paper-dropdown-menu {
					--paper-input-container-label: {
						font-family: "Prompt", "Roboto", "Noto", sans-serif;
						color: var(--accent-color);
						text-align: center;
						font-weight: 700;
						font-size: 48px;
						height: 100%;
						@apply --layout-vertical;
						@apply --layout-center-center;
					};
					--paper-input-container-input: {
						font-family: "Prompt", "Roboto", "Noto", sans-serif;
						color: var(--accent-color);
						text-align: center;
						font-weight: 700;
						font-size: 48px;
					};
					--paper-input-container-underline: {
						display: none;
					};
				}
				model-viewer {
					border-radius: 8px;
					border-top: 1px solid var(--light-text-color);
					border-bottom: 1px solid var(--light-text-color);
					width: 80vw;
					height: 60vh;
				}
				.model model-viewer {
					width: 226px;
					height: 226px;
				}
				.marker {
					border-radius: 8px;
				}
				.assets {
					margin-right: 16px;
				}
				code-sample {
					--code-sample-font-size: 16px;
					--code-sample-copy-button-bg-color: var(--accent-color);
					--code-sample-copy-clipboard-button: {
						padding: 8px;
						font-family: "Roboto Mono", monospace;
						font-weight: bold;
						border-radius: 0 8px 0 8px;
					}
					--code-sample-hljs: {
						border-radius: 8px;
					}
					margin-top: 16px;
				}
				@media (max-width: 640px) {
					.help {
						padding: 16px;
					}
					.assets {
						@apply --layout-flex;
						width: 50%;
					}
					.marker {
						@apply --layout-flex;
						width: 100%;
					}
					.model model-viewer {
						@apply --layout-flex;
						width: 100%;
						height: calc(50vw - 48px);
					}
				}
      </style>
			<paper-tabs selected="{{selected}}" attr-for-selected="name">
				<paper-tab name="markerbased">Marker based</paper-tab>
				<paper-tab name="markerless">Marker less</paper-tab>
			</paper-tabs>
			<iron-pages selected="{{selected}}" attr-for-selected="name">
				<div name="markerbased">
					<div class="grid content">
						<div class="help">
							<h2>What does "Marker Based" means?</h2>
							<p>AEIOU uses <a class="link" href="https://github.com/artoolkit">artoolkit</a>, which is a software with years of experience doing augmented reality.</p>
							<p>We supports a wide range of markers, multiple types of markers, pattern/barcode markers, multiple independent markers at the same time, or multiple markers acting as a single marker up to you to choose.</p>
							<p>
								<a class="link" href="http://au.gmented.com/app/marker/marker.php" target="_blank">
										<paper-button class="primary" aria-label="Barcode Generator">Barcode Generator<iron-icon icon="my-icons:open-in-new"></iron-icon></paper-button>
									</a> Generate barcode markers with numerical values.
							</p>
							<p>
								<a class="link" href="https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html" target="_blank">
									<paper-button class="primary" aria-label="Custom Generator">Custom Generator<iron-icon icon="my-icons:open-in-new"></iron-icon></paper-button>
								</a> Generate pattern markers with your own image.
							</p>
						</div>
					</div>
					<iron-ajax auto url="../data/thisthat.json" id="ajax0" loading="{{loading0}}" handle-as="json" last-error="{{error0}}" last-response="{{ajaxResponse0}}">
					</iron-ajax>
					<div class="content flex-center-center">
						<h1>
							if
						</h1>
						<div>
							<template is="dom-if" if="{{loading0}}">
								<div class="grid actions flex-center-center" hidden$="[[!loading0]]">
									<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
								</div>
							</template>
							<template is="dom-if" if="{{error0}}">
								<template is="dom-if" if="{{!loading0}}">
									<div class="grid error">
										<paper-button on-click="tryAgain" aria-label="Try again">Try again<iron-icon icon="my-icons:refresh"></iron-icon></paper-button>
									</div>
								</template>
							</template>
							<template is="dom-repeat" items="[[ajaxResponse0.this]]" as="this">
								<paper-dropdown-menu label="{{this.title}}" no-label-float>
									<paper-listbox id="selectedThis" slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{selectedThis}}">
										<paper-icon-item name="pattern"><iron-icon icon="my-icons:filter-vintage" slot="item-icon"></iron-icon>Upload your own pattern<paper-ripple></paper-ripple></paper-icon-item>
										<template is="dom-repeat" items="[[this.sub]]" as="sub">
											<paper-icon-item name="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
										</template>
									</paper-listbox>
								</paper-dropdown-menu>
								<paper-icon-button on-click="resetThis" icon="my-icons:refresh" aria-label="Reset" hidden$="{{!selectedThis}}"></paper-icon-button>
							</template>
						</div>
						<h1>
							then
						</h1>
						<div>
							<template is="dom-if" if="{{loading0}}">
								<div class="grid actions flex-center-center" hidden$="[[!loading0]]">
									<paper-spinner-lite active$="[[loading0]]"></paper-spinner-lite>
								</div>
							</template>
							<template is="dom-if" if="{{error0}}">
								<template is="dom-if" if="{{!loading0}}">
									<div class="grid error">
										<paper-button on-click="tryAgain" aria-label="Try again">Try again<iron-icon icon="my-icons:refresh"></iron-icon></paper-button>
									</div>
								</template>
							</template>
							<template is="dom-repeat" items="[[ajaxResponse0.that]]" as="that">
								<paper-dropdown-menu label="{{that.title}}" no-label-float>
									<paper-listbox id="selectedThat" slot="dropdown-content" class="listbox" attr-for-selected="name" selected="{{selectedThat}}">
										<paper-icon-item name="model"><iron-icon icon="my-icons:filter-vintage" slot="item-icon"></iron-icon>Upload your own model<paper-ripple></paper-ripple></paper-icon-item>
										<template is="dom-repeat" items="[[that.sub]]" as="sub">
											<paper-icon-item name="{{sub.link}}"><iron-icon icon="my-icons:{{sub.icon}}" slot="item-icon"></iron-icon>{{sub.title}}<paper-ripple></paper-ripple></paper-icon-item>
										</template>
									</paper-listbox>
								</paper-dropdown-menu>
								<paper-icon-button on-click="resetThat" icon="my-icons:refresh" aria-label="Reset" hidden$="{{!selectedThat}}"></paper-icon-button>
							</template>
						</div>
					</div>
					<div class="content flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}" disabled$="[[isInputEmpty(selectedThis, selectedThat)]]"><paper-button class="primary" aria-label="Next" disabled="[[isInputEmpty(selectedThis, selectedThat)]]">Create</paper-button></a>
					</div>
					<div class="content flex-center-center">
						<paper-button on-click="toggle" aria-expanded$="[[opened]]" aria-controls="collapse" disabled="[[isInputEmpty(selectedThis, selectedThat)]]" hidden="[[isInputEmpty(selectedThis, selectedThat)]]">[[_getText(opened)]] assets<iron-icon icon="my-icons:[[_getIcon(opened)]]"></iron-icon></paper-button>
					</div>
					<iron-collapse id="collapse" opened="{{opened}}" hidden="[[isInputEmpty(selectedThis, selectedThat)]]" tabindex="-1">
						<div class="grid content">
							<div class="help flex-horizontal">
								<div class="assets">
									<div>if marker: {{selectedThis}}</div>
									<img class="marker" src="http://au.gmented.com/app/marker/marker.php?genImage&marker_type=matrix&gen_single_number={{selectedThis}}&marker_size=80&marker_image_resolution=72&ecc_type=none&border_size=0.25&border_is_white=false&border_quiet_zone=false&barcode_dimensions=3">
								</div>
								<div class="flexchild">
									<div>then model: {{selectedThat}}</div>
									<div id="model" class="model"></div>
								</div>
							</div>
							<div>
								<code-sample id="sample" copy-clipboard-button>
									<template>
										Something went wrong!
									</template>
								</code-sample>
							</div>
						</div>
					</iron-collapse>
				</div>
				<div name="markerless">
					<div class="grid content">
						<div class="help">
							<h2>What does "Marker Less" means?</h2>
							<p>AEIOU uses <a class="link" href="https://developers.google.com/ar">ARcore</a> which is a Google’s platform for building augmented reality experiences.</p>
						</div>
					</div>
					<div class="grid flex-center-center">
						<div class="actions">
							<div class="title">Create new scene</div>
						</div>
						<div class="content">
							<model-viewer src="../gltf/test/scene.gltf"
														alt="title"
														controls
														background-color="#eee"
														reveal-when-loaded
														preload
														poster="../images/assets/app/puff.svg">
							</model-viewer>
						</div>
					</div>
				</div>
			</iron-pages>
    `;
	}

	static get properties() {
		return {
			selected: {
				type: String,
				value: "markerbased",
				reflectToAttribute: true
			},
			selectedThis: {
				type: String,
				value: 0,
				reflectToAttribute: true
			},
			selectedThat: {
				type: String,
				value: 0,
				reflectToAttribute: true
			},
			opened: {
				type: Boolean,
				reflectToAttribute: true
			}
		};
	}

	resetThis() {
		this.selectedThis = 0;
	}

	resetThat() {
		this.selectedThat = 0;
	}

	isInputEmpty(a, b) {
		if (this.$.collapse.opened)
			this.$.collapse.toggle();
		if (a === 0 || b === 0) return true;
		return false;
	}

	tryAgain() {
		this.$.ajax0.generateRequest();
	}

	_getText(opened) {
		return opened ? 'Hide' : 'View';
	}

	_getIcon(opened) {
		return opened ? 'expand-less' : 'expand-more';
	}

	toggle() {
		this.$.collapse.toggle();
		let content = (this.$.collapse.opened) ?
			`
<template>
<!doctype HTML>
<html>
<script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.6.2/aframe/build/aframe-ar.js"></script>
<a-scene>
<a-marker type="barcode" value="` + this.selectedThis + `">
<a-entity gltf-model="#` + this.selectedThat + `" scale="0.05 0.05 0.05" animation-mixer></a-entity>
</a-marker>
<a-entity camera></a-entity>
</a-scene>
</html>
</template>
			` :
			`
<template>
Something went wrong!
</template>
			`;
		this.$.sample.innerHTML = content;
		let model = (this.$.collapse.opened) ?
			`
<model-viewer src="https://raw.githubusercontent.com/liyasthomas/lvr/master/assets/gltf/` + this.selectedThat + `/scene.gltf"
							alt="title"
							controls
							background-color="#eee"
							reveal-when-loaded
							preload
							poster="../images/assets/app/puff.svg">
</model-viewer>
			` :
			`
<template>
Something went wrong!
</template>
			`;
		this.$.model.innerHTML = model;
	}
}

window.customElements.define('my-new', MyNew);
