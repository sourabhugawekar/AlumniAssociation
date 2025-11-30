import Section from "./Section";
import Heading from "./Heading";

const Gallery = () => {
  return (
    <Section id="gallery">
      <Heading title="College Events" />
      <div className="flex flex-wrap gap-10 mb-10 justify-center">
        <div className="flex flex-col items-center w-[650px] h-[400px] rounded-lg shadow-lg overflow-hidden bg-n-7 border-green-800">
          {/* Image Section */}
          <div className="w-full h-[60%]">
            <img
              src="https://img.freepik.com/free-photo/group-cheerful-happy-students-sitting-lecture-hall-before-lesson_155003-15121.jpg?t=st=1729316186~exp=1729319786~hmac=d64803778ac268a5c6323ba54fb67bea560500efb970230b71bd908832c6dad6&w=1380"
              alt="Descriptive Alt Text"
              className="w-full h-[250px] object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="w-full h-[40%] p-8 flex flex-col justify-evenly">
            <h3 className="text-xl font-bold text-n-1">
              {" "}
              Annual Tech Symposium
            </h3>
            <p className="text-n-2 text-sm">
              The Annual Tech Symposium brings together tech enthusiasts from
              various departments to showcase innovative projects, attend expert
              lectures, and participate in hands-on workshops.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-[650px] h-[400px] rounded-lg shadow-lg overflow-hidden bg-n-7 border-green-800">
          {/* Image Section */}
          <div className="w-full h-[60%]">
            <img
              src="https://img.freepik.com/free-photo/excited-audience-watching-confetti-fireworks-having-fun-music-festival-night-copy-space_637285-559.jpg?t=st=1729318822~exp=1729322422~hmac=a48d02d5ca24d74e82821bfce56500d9a81df61dc4a69d6d416fa826840abd87&w=1380"
              alt="Descriptive Alt Text"
              className="w-full h-[250px] object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="w-full h-[40%] p-8 flex flex-col justify-evenly">
            <h3 className="text-xl font-bold text-n-1">
              Cultural Fest: Fiesta Week
            </h3>
            <p className="text-n-2 text-sm">
              Fiesta Week is a celebration of diversity and culture, featuring
              dance performances, music competitions, fashion shows, and food
              stalls representing various cultural backgrounds
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-[650px] h-[400px] rounded-lg shadow-lg overflow-hidden bg-n-7 border-green-800">
          {/* Image Section */}
          <div className="w-full h-[60%]">
            <img
              src="https://img.freepik.com/free-photo/students-having-good-time-lecture-hall_23-2147679179.jpg?t=st=1729316305~exp=1729319905~hmac=2121f434f15992bc5ea9013ac92ee3a6e4f1e60096b28171058457866600670c&w=1380"
              alt="Descriptive Alt Text"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description Section */}
          <div className="w-full h-[40%] p-8 flex flex-col justify-evenly">
            <h3 className="text-xl font-boldtext-n-1">Hackathon: CodeSprint</h3>
            <p className="text-n-2 text-sm">
              A 24-hour coding marathon where students come together to develop
              creative solutions to real-world problems.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
export default Gallery;
