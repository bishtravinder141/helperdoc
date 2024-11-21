import { Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { TESTIMONIAL } from "./Constant";

const TestimonialSection = () => {
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="testimonialsSection">
      <Container className="testimonialsContainer pageContainer">
        <Grid textAlign="center" item xs={12}>
          <Typography variant="h2" className="title">
            {t("testimonials_title")}
          </Typography>
          <Typography variant="body1" className="testimonialsSubheading">
            {t("testimonials_content")}
          </Typography>
        </Grid>
        <Slider {...sliderSettings}>
          {TESTIMONIAL.map((testimonial) => (
            <div key={testimonial.id} className="testimonialSlide">
              <Typography variant="body1">{testimonial.content}</Typography>
              <div className="testimonialAuthor">
                <div className="authorImg">
                  <img
                    src={`/images/users/${testimonial.image}`}
                    alt={testimonial.name}
                    className="testimonialImage"
                  />
                </div>
                <div className="authorInfo">
                  <Typography variant="h6">{testimonial.name}</Typography>
                  <Typography variant="body1">
                    {testimonial.occupation}
                  </Typography>
                  <Typography variant="body1">{`${testimonial.reviews} reviews`}</Typography>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default TestimonialSection;
