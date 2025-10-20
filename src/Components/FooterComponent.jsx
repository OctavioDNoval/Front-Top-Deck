import { Instagram, Mail, Phone } from "lucide-react";

export const FooterComponent = () => {
	return (
		<footer>
			<div className="footer-personal-info">
				<div className="logo-container">
					<img src="" alt="" />
				</div>
				<div className="footer-desc">
					<p className="desc"></p>
				</div>
			</div>

			<div className="footer-contacts">
				<div className="contact-container">
					<Instagram />
				</div>
				<div className="contact-container">
					<Phone />
				</div>
				<div className="contact-container">
					<Mail />
				</div>
			</div>
		</footer>
	);
};
