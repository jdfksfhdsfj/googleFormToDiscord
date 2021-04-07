/* global UrlFetchApp */
'use strict';
/* DO NOT EDIT ABOVE THIS LINE */
const webhookURL = 'https://discord.com/api/webhooks/829346032898670594/ov4sB0aXpGLhJnQukYqA3szJLa5gHiDvYDrs5z2dtHXXOKGywr7z0-0KMUYiOyWfG-rS'; // Paste your webhook URL within the simple quotes.
const title = 'new application'; // Specify the title of the embed within the simple quotes. If not provided, it will default to the form's title.
const color = #946240; // Color of the embed in decimal. You can use this hexadecimal to decimal converter: https://www.binaryhexconverter.com/hex-to-decimal-converter
const timeZone = 'America'; // Replace with your timezone code if necessary. Get it from here: https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
/* DO NOT EDIT UNDER THIS LINE */

const onFormSubmit = (form) => {
  const responses = form.response.getItemResponses();
  const fields = responses.map(response => {
    const question = response.getItem().getTitle();
    const answer = response.getResponse() || '`<Empty>`';
    const field = {
      name: question,
      value: answer
    };

    return field;
  });

  const timestamp = form.response.getTimestamp();
  const footer = timestamp.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone,
    timeZoneName: 'short'
  });

  const payload = {
    embeds: [{
      type: 'rich',
      color,
      title: title || form.source.getTitle(),
      fields,
      'footer.text': footer
    }]
  };

  UrlFetchApp.fetch(webhookURL, {
    method: 'post',
    payload: JSON.stringify(payload),
    contentType: 'application/json'
  });
};
