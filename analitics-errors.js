window.onerror = function(message, source, lineno, colno, error) {
    const errorDetails = {
      message: message,
      source: source,
      lineno: lineno,
      colno: colno,
      stack: error && error.stack ? error.stack : 'No stack trace',
      userAgent: navigator.userAgent,
      url: window.location.href,
      cookies: document.cookie || 'No cookies',
    //   localStorage: JSON.stringify(localStorage),
    //   sessionStorage: JSON.stringify(sessionStorage),
      time: new Date().toISOString()
    };

    console.error("Error captured:", errorDetails); // Вивід у консоль

    gtag('event', 'exception', {
      'description': JSON.stringify(errorDetails).slice(0, 500), // Google обмежує довжину
      'fatal': false
    });
  };