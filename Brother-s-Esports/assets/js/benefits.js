// Tabs functionality
document.addEventListener('DOMContentLoaded', function () {
	// Tabs
	const tabBtns = document.querySelectorAll('.tab-btn');
	const tabContents = document.querySelectorAll('.tab-content');
	tabBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			tabBtns.forEach(b => b.classList.remove('active'));
			tabContents.forEach(tc => tc.classList.remove('active'));
			btn.classList.add('active');
			const tabId = btn.getAttribute('data-tab');
			document.getElementById(tabId).classList.add('active');
		});
	});

	// Testimonials slider
	const testimonials = document.querySelectorAll('.testimonial-item');
	const dots = document.querySelectorAll('.dot');
	let current = 0;
	function showTestimonial(idx) {
		testimonials.forEach((item, i) => {
			item.style.display = (i === idx) ? 'block' : 'none';
		});
		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === idx);
		});
	}
	if (testimonials.length > 0) {
		showTestimonial(current);
		document.querySelector('.nav-prev').addEventListener('click', function () {
			current = (current - 1 + testimonials.length) % testimonials.length;
			showTestimonial(current);
		});
		document.querySelector('.nav-next').addEventListener('click', function () {
			current = (current + 1) % testimonials.length;
			showTestimonial(current);
		});
		dots.forEach((dot, i) => {
			dot.addEventListener('click', function () {
				current = i;
				showTestimonial(current);
			});
		});
	}
});
 