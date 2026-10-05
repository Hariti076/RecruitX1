// Official career pages. Apply opens one of these in a new tab.
const careerLinks = {
  Google: 'https://careers.google.com',
  Microsoft: 'https://careers.microsoft.com',
  Amazon: 'https://www.amazon.jobs',
  Flipkart: 'https://www.flipkartcareers.com',
  Adobe: 'https://careers.adobe.com',
  TCS: 'https://www.tcs.com/careers',
  Wipro: 'https://careers.wipro.com',
  Swiggy: 'https://careers.swiggy.com'
};

function careerPage(company) {
  if (careerLinks[company]) {
    return careerLinks[company];
  }
  return `https://www.google.com/search?q=${encodeURIComponent(company + ' careers')}`;
}

module.exports = { careerPage };
