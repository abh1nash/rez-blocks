const { __ } = wp.i18n;
import React, { Component } from "react";
import {
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from "@wordpress/block-editor";
import {
	__experimentalGradientPicker as GradientPicker,
	ColorPalette,
	Panel,
	PanelBody,
	PanelRow,
	TabPanel,
	Button,
} from "@wordpress/components";

import colors from "../colors.json";

export default class ContainerControls extends Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			textColor: "",
			bgColor: "",
			bgGradient: "",
			bgImg: "",
			activeTab: "",
		};
	}
	handleTextColorChange = (value) => {
		this.props.onTextColorChange(value);
	};
	handleBgColorChange = (value) => {
		this.props.onBgColorChange(value);
	};
	handleGradientChange = (value) => {
		this.props.onGradientChange(value);
	};
	handleUpdateImg = (value) => {
		this.props.onImageChange(value);
	};
	render() {
		return (
			<InspectorControls>
				<Panel title="Layout Container Settings">
					<PanelBody title="Options" icon="admin-settings" initialOpen={true}>
						<PanelRow>Text color</PanelRow>
						<PanelRow>
							<ColorPalette
								colors={colors}
								value={this.props.textColor}
								onChange={this.handleTextColorChange}
							/>
						</PanelRow>
						<PanelRow>Background</PanelRow>
						<PanelRow>
							<TabPanel
								tabs={[
									{ name: "bgColor", title: "Color" },
									{ name: "bgImg", title: "Image/Gradient" },
								]}
							>
								{(tab) => {
									return (
										<div>
											{tab.name == "bgColor" && (
												<ColorPalette
													colors={colors}
													value={this.props.bgColor}
													onChange={this.handleBgColorChange}
												/>
											)}
											{tab.name == "bgImg" && (
												<div>
													<p>Gradient</p>
													<GradientPicker
														value={this.props.bgGradient}
														onChange={this.handleGradientChange}
													/>
													<p>Image</p>
													<MediaUploadCheck fallback="You do not have permissions to make changes to the media.">
														<MediaUpload
															title={__("Background image", "image-selector")}
															allowedTypes={["image"]}
															value={this.props.imageObj}
															onSelect={this.handleUpdateImg}
															render={({ open }) => (
																<Button
																	className={
																		"editor-post-featured-image__toggle image-selector-btn"
																	}
																	style={{
																		backgroundImage:
																			"linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url('" +
																			(this.props.imageObj
																				? this.props.imageObj.url
																				: "") +
																			"')",
																	}}
																	onClick={open}
																>
																	<strong>
																		{__(
																			"Choose background image",
																			"image-selector"
																		)}
																	</strong>
																</Button>
															)}
														></MediaUpload>
													</MediaUploadCheck>
												</div>
											)}
										</div>
									);
								}}
							</TabPanel>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
		);
	}
}
