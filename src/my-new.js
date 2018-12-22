import {
	PolymerElement,
	html
} from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-icon-item.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-collapse/iron-collapse.js';

class MyNew extends PolymerElement {
	static get template() {
		return html `
      <style include="shared-styles">
				:host {
          display: block;
					--paper-tabs-selection-bar-color: var(--accent-color);
				}
				demo-snippet {
					--demo-snippet-demo: {
//						display: none;
					}
					--demo-snippet-code: {
//						background-color: #232323;
					}
					--demo-snippet: {
						box-shadow: none;
						overflow: auto;
						border: 1px solid #e0e0e0;
						border-radius: 8px;
					}
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
					color: var(--secondary-text-color);
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
      </style>
			<paper-tabs selected="{{selected}}" attr-for-selected="name">
				<paper-tab name="markerbased">Marker based</paper-tab>
				<paper-tab name="markerless">Marker less</paper-tab>
			</paper-tabs>
			<iron-pages selected="{{selected}}" attr-for-selected="name">
				<div name="markerbased">
					<div class="actions flex-center-center">
						<h1>if
							<div>
								<paper-dropdown-menu label="this" no-label-float>
									<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThis}}">
										<paper-icon-item id="browsethis"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Custom marker<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="marker1"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #1<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="marker2"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #2<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="marker3"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #3<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="marker4"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Marker #4<paper-ripple></paper-ripple></paper-icon-item>
									</paper-listbox>
								</paper-dropdown-menu>
							</div>
							then
							<div>
								<paper-dropdown-menu id="that" label="that" no-label-float>
									<paper-listbox slot="dropdown-content" class="listbox" attr-for-selected="id" selected="{{selectedThat}}">
										<paper-icon-item id="browsethat"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Browse<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="plant"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Plant<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="pet"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Pet<paper-ripple></paper-ripple></paper-icon-item>
										<paper-icon-item id="photo"><iron-icon icon="my-icons:star" slot="item-icon"></iron-icon>Photo<paper-ripple></paper-ripple></paper-icon-item>
									</paper-listbox>
								</paper-dropdown-menu>
							</div>
						</h1>
					</div>
					<div class="actions flex-center-center">
						<a href="{{selectedThis}}/{{selectedThat}}"><paper-button class="primary" aria-label="Next">Create<iron-icon icon="my-icons:chevron-right"></iron-icon></paper-button></a>
						<paper-button on-click="toggle" aria-expanded$="[[opened]]" aria-controls="collapse">View code<iron-icon icon="my-icons:[[_getIcon(opened)]]"></iron-icon></paper-button>
					</div>
					<iron-collapse id="collapse" opened="{{opened}}" tabindex="-1">
						<div class="grid actions flex-center-center">
							<demo-snippet>
									<template preserve-content>
<h2>Demo using A-Frame and AR.js</h2>
<script src="https://aframe.io/releases/0.6.1/aframe.min.js"></script>
<script src="https://cdn.rawgit.com/jeromeetienne/AR.js/1.5.0/aframe/build/aframe-ar.js"> </script>
<a-scene embedded arjs>
	<a-marker preset="{{selectedThis}}/{{selectedThat}}">
		<a-box position='0 0.5 0' material='color: black;'></a-box>
	</a-marker>
<a-entity camera></a-entity>
</a-scene>
									</template>
							</demo-snippet>
						</div>
					</iron-collapse>
				</div>
				<div name="markerless">
					Page Two
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
			opened: {
				type: Boolean,
				reflectToAttribute: true
			}
		};
	}

	_getIcon(opened) {
		return opened ? 'expand-less' : 'expand-more';
	}

	toggle() {
		this.$.collapse.toggle();
	}
}

window.customElements.define('my-new', MyNew);