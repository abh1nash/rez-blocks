import "./editor.scss";
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

import { InspectorControls, InnerBlocks } from "@wordpress/block-editor";
import {
	Panel,
	PanelBody,
	PanelRow,
	SelectControl,
} from "@wordpress/components";

registerBlockType("abhinash/alert", {
	title: __("Alert Box"), // Block title.
	icon: "info", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "rez-blocks", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__("alert"), __("info"), __("box")],
	selector: "div",

	attributes: {
		alertType: { type: "string", default: "primary" },
	},

	edit: (props) => {
		const handleAlertTypeChange = (value) => {
			props.setAttributes({ alertType: value });
		};
		const alertOptions = [
			{ label: "Primary", value: "primary" },
			{ label: "Secondary", value: "secondary" },
			{ label: "Accent", value: "accent" },
			{ label: "Success", value: "success" },
			{ label: "Warning", value: "warning" },
			{ label: "Danger", value: "danger" },
		];

		return (
			<div>
				{
					<InspectorControls>
						<Panel title="Alert Blocks Settings">
							<PanelBody
								initialOpen={true}
								title="Options"
								icon="admin-settings"
							>
								<PanelRow>
									<SelectControl
										value={props.attributes.alertType}
										options={alertOptions}
										label="Alert Type"
										onChange={handleAlertTypeChange}
									/>
								</PanelRow>
							</PanelBody>
						</Panel>
					</InspectorControls>
				}
				<div
					className={
						"editor-alert editor-alert-type-" + props.attributes.alertType
					}
				>
					<InnerBlocks />
				</div>
			</div>
		);
	},
	save: (props) => {
		return (
			<div className={"alert alert-" + props.attributes.alertType}>
				<InnerBlocks.Content />
			</div>
		);
	},
});
