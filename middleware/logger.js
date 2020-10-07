module.exports = (format) => {
	return (req, res, next) => {
		switch (format) {
			case "short":
				const time = new Date().toISOString();
				console.log(`Time Site Accessed: ${time}`);
				break;
			case "long":
				console.log(`Origin IP Address: ${req.ip}`);
				console.log(`URL Requested: ${req.url}`);
				console.log(`Method Used: ${req.method}`);
				break;
		}
		next();
	};
};
