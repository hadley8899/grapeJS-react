import React, { useState } from 'react';
import grapejsMjml from 'grapesjs-mjml';
import 'grapesjs/dist/css/grapes.min.css';
import './App.css';
import { GrapesjsReact } from 'grapesjs-react';


function App() {
    const [editor, setEditor] = useState(null);

    const starterTemplate = `
<mjml>
  <mj-body background-color="#F4F4F4" color="#55575d" font-family="Arial, sans-serif">
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" vertical-align="top">
      <mj-column>
        <mj-image align="center" border="none" padding-bottom="30px" padding="10px 25px" src="http://5vph.mj.am/img/5vph/b/1g86w/0g67t.png" target="_blank" title="" width="180px"></mj-image>
        <mj-text align="left" color="#55575d" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="0px" padding-top="0px" padding="10px 25px">
          <p style="line-height: 18px; margin: 10px 0; text-align: center;font-size:14px;color:#ffffff;font-family:'Times New Roman',Helvetica,Arial,sans-serif">WOMEN&nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; MEN&nbsp; &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; KIDS</p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" vertical-align="top" padding="0 0 0 0">
      <mj-column>
        <mj-image align="center" border="none" padding-bottom="0px" padding-left="0px" padding-right="0px" padding="0px 25px" src="http://5vph.mj.am/img/5vph/b/1g86w/0696u.jpeg" target="_blank" title="" width="780px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" vertical-align="top" padding="0 0 0 0">
      <mj-column>
        <mj-text align="left" color="#55575d" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="5px" padding-top="25px" padding="10px 25px">
          <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:55px;color:#fcfcfc;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Black Friday</b></p>
        </mj-text>
        <mj-text align="left" color="#55575d" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="20px" padding-top="0px" padding="10px 25px">
          <p style="line-height: 30px; text-align: center; margin: 10px 0;color:#f5f5f5;font-size:25px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Take an&nbsp; extra 50% off</b><br /><span style="color:#ffffff;font-size:18px;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Use code SALEONSALE* at checkout</span></p>
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#000000" background-repeat="no-repeat" text-align="center" vertical-align="top" padding-bottom="40px" padding="0 0 0 0">
      <mj-column>
        <mj-button background-color="#ffffff" border-radius="3px" font-family="Times New Roman, Helvetica, Arial, sans-serif" font-size="18px" font-weight="normal" inner-padding="10px 25px" padding-bottom="30px" padding="10px 25px"><span style="color:#212020">Shop Now</span></mj-button>
        <mj-text align="left" color="#55575d" font-family="Arial, sans-serif" font-size="13px" line-height="22px" padding-bottom="0px" padding-top="5px" padding="10px 25px">
          <p style="line-height: 16px; text-align: center; margin: 10px 0;font-size:12px;color:#ffffff;font-family:'Times New Roman',Helvetica,Arial,sans-serif">* Offer valid on Allura purchases on 17/29/11 at 11:59 pm. No price adjustments on previous&nbsp;<br /><span style="color:#ffffff;font-family:'Times New Roman',Helvetica,Arial,sans-serif">purchases, offer limited to stock. Cannot be combined with any offer or promotion other than free.</span></p>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`;


//     const starterTemplate = `
//     <mjml>
//   <mj-body>
//     <mj-section>
//       <mj-column width="100%">
//         <mj-text font-size="20px" align="center">Header</mj-text>
//       </mj-column>
//     </mj-section>
//     <mj-section>
//       <mj-column width="600px">
//         <mj-text font-size="14px">This is the body of the email template. You can edit this section and add more content as needed.</mj-text>
//       </mj-column>
//     </mj-section>
//     <mj-section>
//       <mj-column width="100%">
//         <mj-text font-size="16px" align="center">Footer</mj-text>
//       </mj-column>
//     </mj-section>
//   </mj-body>
// </mjml>`;

    const handleEditorInit = (editorInstance) => {
        setEditor(editorInstance);

        const mjml2html = require('mjml-browser');
        const initialTemplate = mjml2html(starterTemplate).html;

        // const initialTemplate = mjml2html(starterTemplate).html;
        editorInstance.setComponents(starterTemplate);

        const blockManager = editorInstance.BlockManager;

        blockManager.add('my-custom-block', {
            label: 'Custom Block',
            content: '<div class="my-custom-block">This is my custom block!</div>',
        });

        blockManager.add('my-custom-block', {
            label: 'Custom Block',
            content: '<div class="my-custom-block">This is my custom block!</div>',
        });

        // Add the save button to the editor's panel
        const panelManager = editorInstance.Panels;
        panelManager.addButton('options', {
            id: 'save-button',
            className: 'fa fa-floppy-o',
            command: 'save-command',
            attributes: { title: 'Save' },
        });

        // Define the save command
        editorInstance.Commands.add('save-command', {
            run: handleSave,
        });
    };

    const handleSave = async () => {
        if (editor) {
            const html = editor.getHtml();
            const css = editor.getCss();

            // Send the HTML and CSS to your API endpoint
            // Replace with your actual API endpoint URL
            const apiEndpoint = 'https://your-api-endpoint.com/save';

            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ html, css }),
                });

                // Handle the response as needed
                if (response.ok) {
                    console.log('Saved successfully');
                } else {
                    console.error('Error saving the content');
                }
            } catch (error) {
                console.error('Error while sending data to the API', error);
            }
        }
    };

    return (
        <>
            <GrapesjsReact
                id="grapesjs-react"
                plugins={[grapejsMjml]}
                pluginsOpts={{
                    [grapejsMjml]: {},
                }}
                onInit={handleEditorInit}
            />
        </>
    );
}

export default App;
