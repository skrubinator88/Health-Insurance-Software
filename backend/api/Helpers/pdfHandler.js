const fs = require('fs');
const path = require('path');
const fontSize = 12;
const namePosition = 120;
const pricePosition = 400;
const qtyPosition = 450;
const amtPosition = 500;
const custOrderNoPosition = 30;
const salesmanPosition = 155;
const insurancePosition = 255;
const fobPosition = 375;
const datePosition = 475;
const {
    PDFDocumentFactory,
    PDFDocumentWriter,
    StandardFonts,
    drawLinesOfText,
} = require('pdf-lib');

module.exports = {
    generateFile({ patient, info, items }) {
        return new Promise(async (resolve, reject) => {
            try {
                const invoicePDF = fs.readFileSync(path.join(__dirname, './invoice.pdf'));
                const pdfDoc = PDFDocumentFactory.load(invoicePDF);
                const TIMES_ROMAN_FONT = 'TimesRoman';
                const UBUNTU_FONT = 'Ubuntu';
                let startingXPosition = 0;
                let startingYPosition = 0;

                const [timesRomanRef, timesRomanFont] = pdfDoc.embedStandardFont(
                    StandardFonts.TimesRoman,
                );

                const pages = pdfDoc.getPages();

                const patientInfoContentStream = pdfDoc.createContentStream(
                    drawLinesOfText(
                        [
                            patient.name,
                            info.address ? info.address : patient.street1,
                            `${patient.city}, ${patient.state} ${patient.zipCode}`,
                            '',
                            'Phone #: ' + patient.telephone1
                        ].map(timesRomanFont.encodeText),
                        {
                            x: 30,
                            y: 650,
                            font: TIMES_ROMAN_FONT,
                            size: fontSize,
                            colorRgb: [0,0,0],
                        }
                    )
                );

                const dividerContentStream = addDivider(30, 590, pdfDoc, TIMES_ROMAN_FONT, timesRomanFont, '=', 75);
                let contentStreams = [];
                startingYPosition = 590;
                startingXPosition = 30;
                contentStreams.push(
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'Invoice #'
                            ].map(timesRomanFont.encodeText),
                            {
                                x: startingXPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'Salesman'
                            ].map(timesRomanFont.encodeText),
                            {
                                x: salesmanPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'Insurance Type'
                            ].map(timesRomanFont.encodeText),
                            {
                                x: insurancePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'DOB'
                            ].map(timesRomanFont.encodeText),
                            {
                                x: fobPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'Date'
                            ].map(timesRomanFont.encodeText),
                            {
                                x: datePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    ))
                );

                startingYPosition = startingYPosition - (fontSize);

                contentStreams.push(
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                info.invoiceNo ? `${info.invoiceNo}` : "N/A"
                            ].map(timesRomanFont.encodeText),
                            {
                                x: startingXPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                info.salesman ? info.salesman : "N/A"
                            ].map(timesRomanFont.encodeText),
                            {
                                x: salesmanPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                patient.insuranceType ? patient.insuranceType : "N/A"
                            ].map(timesRomanFont.encodeText),
                            {
                                x: insurancePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                patient.birthdate ? `${patient.birthdate.toLocaleDateString()}` : "N/A"
                            ].map(timesRomanFont.encodeText),
                            {
                                x: fobPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                `${new Date().toLocaleDateString("en-US")}`
                            ].map(timesRomanFont.encodeText),
                            {
                                x: datePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    ))
                );

                startingYPosition = startingYPosition - (fontSize * 2);

                contentStreams.push(
                    pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                `Part No.`,
                            ].map(timesRomanFont.encodeText),
                            {
                                x: startingXPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )), pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                `Description`,
                            ].map(timesRomanFont.encodeText),
                            {
                                x: namePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                `Qty`,
                            ].map(timesRomanFont.encodeText),
                            {
                                x: qtyPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )),pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                'Price ($)',
                            ].map(timesRomanFont.encodeText),
                            {
                                x: pricePosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )), pdfDoc.register(pdfDoc.createContentStream(
                        drawLinesOfText(
                            [
                                `Amount`,
                            ].map(timesRomanFont.encodeText),
                            {
                                x: amtPosition,
                                y: startingYPosition - (fontSize * 2),
                                font: TIMES_ROMAN_FONT,
                                size: fontSize,
                                colorRgb: [0,0,0],
                            })
                    )));

                startingYPosition = startingYPosition - (fontSize * 2);
                contentStreams.push(addDivider(startingXPosition, startingYPosition, pdfDoc, TIMES_ROMAN_FONT, timesRomanFont, '=', 75));

                const existingPage = pages[0]
                    .addFontDictionary(TIMES_ROMAN_FONT, timesRomanRef);
                contentStreams.push(pdfDoc.register(patientInfoContentStream), dividerContentStream);
                items.map(item => {
                    addItem(startingXPosition, startingYPosition, pdfDoc, TIMES_ROMAN_FONT, timesRomanFont, item, contentStreams);

                    startingYPosition = startingYPosition - (fontSize);
                });

                startingYPosition = startingYPosition - (fontSize * 2);

                if(info.isFinal === true) {
                    let startingBottomYPosition = 280;
                    contentStreams.push(addDivider(startingXPosition, startingBottomYPosition, pdfDoc, TIMES_ROMAN_FONT, timesRomanFont, '=', 75),
                        pdfDoc.register(pdfDoc.createContentStream(
                            drawLinesOfText(
                                [
                                    `Subtotal          $       ${info.subtotal}`,
                                ].map(timesRomanFont.encodeText),
                                {
                                    x: startingXPosition + 375,
                                    y: startingBottomYPosition - (fontSize * 2),
                                    font: TIMES_ROMAN_FONT,
                                    size: fontSize,
                                    colorRgb: [0,0,0],
                                })
                        )))

                    startingBottomYPosition = startingBottomYPosition - (fontSize * 2);

                    contentStreams.push(
                        pdfDoc.register(pdfDoc.createContentStream(
                            drawLinesOfText(
                                [
                                    `SalesTax         $       ${info.salesTax}`,
                                ].map(timesRomanFont.encodeText),
                                {
                                    x: startingXPosition + 375,
                                    y: startingBottomYPosition - (fontSize * 2),
                                    font: TIMES_ROMAN_FONT,
                                    size: fontSize,
                                    colorRgb: [0,0,0],
                                })
                        )));
                    startingBottomYPosition = startingBottomYPosition - (fontSize * 2);

                    contentStreams.push(
                        pdfDoc.register(pdfDoc.createContentStream(
                            drawLinesOfText(
                                [
                                    `GrandTotal     $       ${info.total}`,
                                ].map(timesRomanFont.encodeText),
                                {
                                    x: startingXPosition + 375,
                                    y: startingBottomYPosition - (fontSize * 2),
                                    font: TIMES_ROMAN_FONT,
                                    size: fontSize,
                                    colorRgb: [0,0,0],
                                })
                        )))
                }

                existingPage.addContentStreams(...contentStreams);

                const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
                resolve(pdfBytes);
            } catch(err) {
                console.log(err);
                reject(err)
            }
        })
    }
};

function addDivider(xPosition, yPosition, pdf, fontConstant, font, dividerType, length) {
    let divider = dividerType;
    for(let x = 0; x < length; x++) {
        divider = divider + dividerType;
    }
    return pdf.register(pdf.createContentStream(
        drawLinesOfText(
            [
                '',
                divider,
                ''
            ].map(font.encodeText),
            {
                x: xPosition,
                y: yPosition,
                font: fontConstant,
                size: fontSize,
                colorRgb: [0,0,0],
            }
        )
    ));
}

function addItem(xPosition, yPosition, pdf, fontConstant,  font, item, array) {

        array.push(pdf.register(pdf.createContentStream(
        drawLinesOfText(
            [
                `${item.part}`,
            ].map(font.encodeText),
            {
                x: xPosition,
                y: yPosition - (fontSize * 2),
                font: fontConstant,
                size: fontSize,
                colorRgb: [0,0,0],
            })
        )));
        array.push(pdf.register(pdf.createContentStream(
            drawLinesOfText(
                [
                    `${item.name}`,
                ].map(font.encodeText),
                {
                    x: namePosition,
                    y: yPosition - (fontSize * 2),
                    font: fontConstant,
                    size: fontSize,
                    colorRgb: [0,0,0],
                })
        )));
        array.push(pdf.register(pdf.createContentStream(
            drawLinesOfText(
                [
                    `${item.qty}`,
                ].map(font.encodeText),
                {
                    x: qtyPosition,
                    y: yPosition - (fontSize * 2),
                    font: fontConstant,
                    size: fontSize,
                    colorRgb: [0,0,0],
                })
        )));
        array.push(pdf.register(pdf.createContentStream(
            drawLinesOfText(
                [
                    `$${item.price}`,
                ].map(font.encodeText),
                {
                    x: pricePosition,
                    y: yPosition - (fontSize * 2),
                    font: fontConstant,
                    size: fontSize,
                    colorRgb: [0,0,0],
                })
        )));
        array.push(pdf.register(pdf.createContentStream(
            drawLinesOfText(
                [
                    `$${(item.price * item.qty).toFixed(2)}`,
                ].map(font.encodeText),
                {
                    x: amtPosition,
                    y: yPosition - (fontSize * 2),
                    font: fontConstant,
                    size: fontSize,
                    colorRgb: [0,0,0],
                })
        )));
}