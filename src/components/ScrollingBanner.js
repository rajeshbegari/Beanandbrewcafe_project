import React, { useEffect, useRef } from 'react';
import '../Styles/ScrollingBanner.css';

const images = [
    { src: '/images/scrollingbanner1.jpeg', caption: 'Expresso', description: 'Strong, rich coffee brewed by forcing hot water through finely-ground beans.', price: '$3.99', linkType: 'buy', link: '/view-menu' },
    { src: '/images/scrollingbanner2.jpeg', caption: 'Latte', description: 'Smooth espresso with steamed milk, topped with a light foam.', price: '$4.99', linkType: 'learn', link: '/learn-more' },
    { src: '/images/scrollingbanner3.jpeg', caption: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam, offering a creamy texture.', price: '$5.99', linkType: 'buy', link: '/view-menu' },
    { src: '/images/scrollingbanner4.jpeg', caption: 'Americano', description: 'Espresso diluted with hot water, similar to drip coffee in strength.', price: '$6.99', linkType: 'learn', link: '/learn-more' },
    { src: '/images/scrollingbanner5.jpeg', caption: 'Mocha', description: 'Espresso mixed with steamed milk and chocolate syrup, topped with whipped cream.', price: '$7.99', linkType: 'buy', link: '/view-menu' },
    { src: '/images/scrollingbanner6.jpeg', caption: 'Macchiato', description: 'Espresso with a dash of steamed milk and foam for a bold flavor.', price: '$8.99', linkType: 'buy', link: '/view-menu' },
    { src: '/images/scrollingbanner7.jpeg', caption: 'Flat White', description: 'Espresso with microfoam, offering a stronger coffee-to-milk ratio than a latte.', price: '$9.99', linkType: 'learn', link: '/learn-more' },
    { src: '/images/scrollingbanner8.jpeg', caption: 'Affogato', description: 'Espresso poured over a scoop of vanilla ice cream.', price: '$10.99', linkType: 'buy', link: '/view-menu' },
    { src: '/images/scrollingbanner9.jpeg', caption: 'Cortado', description: 'Equal parts espresso and steamed milk, providing a balanced flavor.', price: '$11.99', linkType: 'learn', link: '/learn-more' },
    { src: '/images/scrollingbanner10.jpeg', caption: 'Iced Coffee', description: 'Brewed coffee cooled and served over ice, customizable with sweeteners and flavors.', price: '$12.99', linkType: 'buy', link: '/view-menu' },
];

const ScrollingBanner = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        const banner = bannerRef.current;

        const pauseAnimation = () => {
            banner.style.animationPlayState = 'paused';
        };

        const resumeAnimation = () => {
            banner.style.animationPlayState = 'running';
        };

        banner.addEventListener('mouseover', pauseAnimation);
        banner.addEventListener('mouseout', resumeAnimation);

        return () => {
            banner.removeEventListener('mouseover', pauseAnimation);
            banner.removeEventListener('mouseout', resumeAnimation);
        };
    }, []);

    return (
        <div className="scrolling-banner-wrapper">
            <div className="scrolling-banner" ref={bannerRef}>
                {images.concat(images).map((image, index) => (
                    <div key={index} className="banner-item">
                        <img src={image.src} alt={`Image ${index % images.length + 1}`} className="img-fluid" />
                        <div className="banner-caption">
                            <h4>{image.caption}</h4>
                            <p>{image.description}</p>
                            <p>Price: <strong>{image.price}</strong></p>
                            <button className="btn btn-primary" onClick={() => window.location.href=image.link}>
                                {image.linkType === 'buy' ? 'Order Now' : 'Learn More'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ScrollingBanner;


