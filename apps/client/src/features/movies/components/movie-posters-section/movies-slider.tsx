import Slider, { type Settings } from "react-slick";

const settings = {
    dots: false,
    class: "h-55 w-full",
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
        {
            breakpoint: 2048,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 1500,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            },
        },
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                centerMode: true,
                initialSlide: 2,
            },
        },
    ],
};

interface Props {
    children: React.ReactNode;
    extraSettings?: Settings;
}

export default function MoviesSlider({ children, extraSettings }: Props) {
    const config = {
        ...settings,
        ...extraSettings,
        responsive: extraSettings?.responsive ?? settings.responsive,
    };
    console.log(config.responsive.length);
    return <Slider {...config}>{children}</Slider>;
}
