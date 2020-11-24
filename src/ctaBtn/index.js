const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { RichText, InspectorControls } from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
	TextControl,
	PanelRow,
	ColorPalette,
} from "@wordpress/components";
import colors from "../colors.json";

registerBlockType("abhinash/cta-btn", {
	title: __("Click-To-Action Button"), // Block title.
	icon: "button", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "rez-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("cta"), __("button"), __("btn")],
	selector: "div",

	attributes: {
		bgColor: { type: "string" },
		textColor: { type: "string" },
		btnTxt: { type: "string" },
		url: { type: "string" },
		align: { type: "string", default: "left" },
	},

	supports: {
		align: ["left", "center", "right"],
	},
	edit: (props) => {
		const handleURL = (url) => {
			props.setAttributes({ url: url });
		};
		const handleTextColorChange = (color) => {
			props.setAttributes({ textColor: color });
		};
		const handleBgColorChange = (color) => {
			props.setAttributes({ bgColor: color });
		};
		const handleBtnTxt = (value) => {
			props.setAttributes({ btnTxt: value });
		};
		return (
			<div className={"text-" + props.attributes.align}>
				{
					<InspectorControls>
						<Panel title="Button Settings">
							<PanelBody
								title="Options"
								icon="admin-settings"
								initialOpen={true}
							>
								<PanelRow>Text color</PanelRow>
								<PanelRow>
									<ColorPalette
										colors={colors}
										value={props.attributes.textColor}
										onChange={handleTextColorChange}
									/>
								</PanelRow>
								<PanelRow>Background color</PanelRow>
								<PanelRow>
									<ColorPalette
										colors={colors}
										value={props.attributes.bgColor}
										onChange={handleBgColorChange}
									/>
								</PanelRow>
								<PanelRow>
									<TextControl
										label="Destination URL"
										value={props.attributes.url}
										onChange={handleURL}
									/>
								</PanelRow>
							</PanelBody>
						</Panel>
					</InspectorControls>
				}

				<RichText
					className="cta-btn"
					tagName="a"
					value={props.attributes.btnTxt}
					placeholder="Button text"
					onChange={handleBtnTxt}
				/>
			</div>
		);
	},
	save: (props) => {
		return (
			<div className={props.className + " text-" + props.attributes.align}>
				<a
					href={props.attributes.url}
					class="btn btn-lg btn-accent text-white font-weight-bold text-uppercase"
					style={{
						backgroundColor: props.attributes.bgColor,
						color: props.attributes.textColor,
					}}
				>
					{props.attributes.btnTxt}
				</a>
			</div>
		);
	},
});
