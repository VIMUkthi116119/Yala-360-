
import React from 'react';

const StoryBlock = ({ title, text, image, reverse }: any) => (
  <div className={`flex flex-col lg:flex-row ${reverse ? 'lg:flex-row-reverse' : ''} items-center bg-white mb-20 shadow-sm overflow-hidden`}>
    <div className="lg:w-1/2 h-[600px]">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="lg:w-1/2 p-12 lg:p-20 space-y-6">
      <h2 className="text-4xl serif text-gold">{title}</h2>
      <div className="w-16 h-[1px] bg-gold"></div>
      <p className="text-gray-600 font-light leading-loose text-lg">
        {text}
      </p>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-24 bg-beige">
      <header className="max-w-4xl mx-auto text-center mb-24">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">The Jewel of the East</span>
        <h1 className="text-6xl serif mb-8">Understanding Yala</h1>
        <p className="text-xl text-gray-600 font-light leading-relaxed italic">
          Spanning 979 square kilometers, Yala is a tapestry of semi-arid thorn scrub, monsoon forests, and freshwater wetlands.
        </p>
      </header>

      <StoryBlock 
        title="Spirit of the Leopard"
        text="Yala is famous for having the world's highest density of leopards. These elusive predators are the undisputed kings of the park, often seen lounging on ancient granite outcrops during the early hours of dawn or dusk."
        image="https://picsum.photos/seed/leopardstory/1000/1200"
      />

      <StoryBlock 
        reverse
        title="Legacy of Conservation"
        text="Designated a wildlife sanctuary in 1900, and a national park in 1938, Yala has a long history of protecting biodiversity. Today, YALA360 continues this mission by digitalizing the experience to minimize ecological stress."
        image="https://picsum.photos/seed/conservestory/1000/1200"
      />

      <StoryBlock 
        title="Safari Culture"
        text="The ritual of the safari is deeply ingrained in Sri Lankan heritage. From the morning dew on the jeep windshield to the hush that falls over the cabin when an elephant approaches, it is a journey of patience and respect."
        image="https://picsum.photos/seed/safariculture/1000/1200"
      />
    </div>
  );
};

export default About;
