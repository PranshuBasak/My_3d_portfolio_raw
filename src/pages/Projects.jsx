import { Link } from 'react-router-dom';
import { projects } from '../constants/index.js';
import { arrow } from '../assets/icons/index.js';
import CTA from '../components/CTA';
import Card from '../components/Card.jsx';

const Projects = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        My  &nbsp;
         <span className="blue-gradient_text font-semibold drop-shadow">
          Projects 
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p className="">
        As a passionate and dedicated developer, my journey in the world of programming has been marked by a series of engaging and challenging projects, each reflecting my growing expertise and enthusiasm for technology. This is a testament to my commitment to excellence and my continuous pursuit of learning and improvement.
        </p>
      </div>
      <div className="flex flex-wrap my-20 gap-16">
        {projects.map((project) =>(
          <div className="lg:w-[400px] w-full" key={project.name}>
              <div className="block-container w-12 h-12">
                <div className={`btn-back rounded-xl ${project.theme}`}/>
                  <div className="btn-front rounded-xl flex justify-center items-center">
                    <img src={project.iconUrl} alt="Project Icon" 
                    className='w-1/2 h-1/2 object-contain'/>
                  </div>
              </div>
            <div className="mt-5 flex flex-col">
              <h4 className="text-2xl font-poppins font-semibold">
                {project.name}
              </h4>
              <p className="mt-2 text-slate-500)">
                {project.description}
              </p>
              <div className="mt-5 flex items-center gap-8 font-poppins">
                <Link to={project.git}
                target="_blank"
                rel="noopener noreferrer"
                className='font-semibold text-blue-600'>
                  Github Repo
                </Link>
                
                <Link to={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className='font-semibold text-blue-600 flex items-center gap-2'>
                  Live Link
                  <img src={arrow} alt="arrow" 
                className='h-4 w-4 object-contain'/>
                </Link>
                
              </div>
            </div>
            <div className="block-container w-300 h-200 pt-4">

              <img src={project.image} alt="Project Image" 
              className={`object-fit btn-bc rounded-xl shadow-2xl hover:shadow-3xl shadow-${project.color}`}/>

            </div>
          </div>
        ))}
      </div>

      <hr className="border-slate-200" />
      <CTA />
    </section>
  )
}

export default Projects