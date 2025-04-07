"use client"
import Image from 'next/image';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import Consultation from '../components/consultation/page';
import Banner from '../components/CommonBanner/page';
import AboutBanner from '../../public/AboutBanner.png';
import AboutContainer2 from '../../public/AboutContainer2.png'
import AboutContainer from '../../public/AboutContainer.png'
import Aboutlink from '../../public/Aboutlink.png'; // Replace with your image path
import Aboutlink2 from '../../public/Aboutlink2.png'; // Replace with your image path
import DottedPattern from '../components/dottedPattern/page'; // Ensure this component exists
import { motion } from "framer-motion";
import AbtTeam1 from '../../public/AbtTeam1.png'
import AbtTeam2 from '../../public/AbtTeam2.png'
import AbtOurJouney1 from '../../public/AbtOurJouney1.png'
import AbtOurJouney2 from '../../public/AbtOurJouney2.png'
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const services = [
    {
        title: "Tailored Therapy Plans",
        description:
            "Enhancing motor skills, coordination, and self-care abilities to help children achieve independence in daily activities.",
    },
    {
        title: "Multidisciplinary Team",
        description:
            "Occupational therapists, speech therapists, special educators, and counselors work together for comprehensive care.",
    },
    {
        title: "Child-Friendly, Safe Environment",
        description: "Our clinic is designed for sensory exploration and engagement.",
    },
];
const services2 = [{
    title: "Family Involvement & Parental Guidance",
    description:
        "We believe therapy success comes from collaborating with families.",
},
{
    title: "Advanced Therapy Techniques & Tools",
    description:
        "Cutting-edge technology combined with evidence-based intervention methods.",
},]

const faqs = [
  {
      question: "What services does 8 Senses Pediatric Occupational Therapy & Speech Therapy Clinic offer?",
      answer: "At 8 Senses, we offer a comprehensive range of services for children with developmental challenges. Our services include: Pediatric Occupational Therapy tailored for children with neurological, sensory, and motor impairments; Speech Therapy focusing on improving language, communication, and speech-related issues; Early Intervention Programs specialized for developmental delays in young children; Sensory Integration Therapy for children with sensory processing difficulties; Fine Motor & Gross Motor Development helping children develop essential motor skills; Feeding Therapy for children with difficulties related to eating and swallowing; and Parent Guidance and Education workshops and training to help parents better understand and support their children."
  },
  {
      question: "What types of conditions do you treat?",
      answer: "We specialize in treating a wide range of developmental disorders and conditions, including but not limited to: Autism Spectrum Disorder (ASD), Attention Deficit Hyperactivity Disorder (ADHD), Sensory Processing Disorder (SPD), Developmental Delays, Cerebral Palsy, Down Syndrome, Speech and Language Delays, Feeding and Swallowing Disorders, and Motor Coordination Disorders."
  },
  {
      question: "How do I know if my child needs occupational or speech therapy?",
      answer: "Signs that your child may need therapy include: Delayed speech, language, or communication skills; Difficulty with motor tasks like holding a pencil, using utensils, or coordinating movements; Challenges in sensory processing, such as being overly sensitive to lights, sounds, or touch; Struggles with self-care tasks such as dressing, feeding, or using the toilet; Behavioral issues related to frustration, anxiety, or social interaction difficulties; Feeding difficulties like choking, gagging, or not wanting to eat certain textures."
  },
  {
      question: "What is sensory integration therapy?",
      answer: "Sensory integration therapy helps children who have trouble processing and responding to information from their senses. Our clinic uses specialized equipment and activities to help children better regulate their sensory input, which in turn can improve their behavior, coordination, and ability to focus."
  },
  {
      question: "What does a typical occupational therapy session look like?",
      answer: "A typical session lasts between 45 minutes and is customized based on your child's needs. It involves a combination of: Play-based activities to improve fine and gross motor skills; Sensory integration exercises to help children respond better to sensory inputs; Strengthening exercises for coordination and balance; Self-care skill development for tasks like dressing, feeding, and grooming; Parental guidance and training for follow-up activities at home."
  },
  {
      question: "How is speech therapy conducted?",
      answer: "Speech therapy sessions are designed to improve your child's communication, speech, and language skills. It may include: Exercises to strengthen the muscles used for speech; Techniques to improve understanding and use of language; Articulation therapy for clearer speech sounds; Play-based learning to enhance social communication skills; Assistive communication tools for children with limited verbal communication."
  },
  {
      question: "How do I schedule an appointment at 8 Senses?",
      answer: "You can book an appointment by calling our clinic directly at 9309187144, 9766712546, 8600994239 or by visiting our website and filling out the appointment form. We recommend scheduling an initial consultation to assess your child's needs."
  },
  {
      question: "What is the cost of therapy, and do you offer any concessions?",
      answer: "The cost of therapy varies depending on the type and frequency of sessions."
  },
  {
      question: "What should I expect during the first consultation?",
      answer: "During your first consultation, we will: Conduct a thorough evaluation of your child's developmental needs; Discuss your child's history, challenges, and goals; Develop an individualized therapy plan tailored to your child; Provide you with guidance on what to expect from the therapy process; Schedule future therapy sessions based on the assessment."
  },
  {
      question: "Do you offer group therapy or individual sessions?",
      answer: "We offer both individual and group therapy sessions, depending on the child's needs. Individual sessions focus on personalized care, while group therapy helps children develop social skills and learn from their peers in a collaborative setting."
  },
  {
      question: "What kind of equipment and tools are used during therapy?",
      answer: "Our clinic is equipped with advanced tools and technology, including: Sensory integration equipment like swings, trampolines, and therapy balls; Fine motor development aids such as puzzles, beading, and cutting tools; Balance and coordination tools like balance boards and climbing structures; Auditory and visual stimulation tools to improve sensory regulation; Feeding therapy equipment for children with oral-motor difficulties."
  },
  {
      question: "How can parents support therapy at home?",
      answer: "We encourage parents to participate actively in their child's therapy. We provide home programs with activities and exercises that can be incorporated into daily routines to enhance progress. Additionally, our workshops offer valuable information to help parents understand how to create a supportive environment at home."
  },
  {
      question: "Do you conduct workshops or community outreach programs?",
      answer: "Yes, we host regular workshops to raise awareness about pediatric occupational therapy, speech therapy, and developmental disorders. We also conduct free assessments for underprivileged children and offer community outreach programs to ensure access to therapy for all."
  },
  {
      question: "What is your approach to early intervention?",
      answer: "Early intervention is a key focus at 8 Senses. By identifying developmental issues early and beginning therapy as soon as possible, we help children achieve their maximum potential and prevent further delays. Our early intervention programs are designed for children under the age of 6, addressing challenges such as speech delays, motor skill difficulties, and sensory processing issues."
  },
  {
      question: "What is the success rate of your therapy programs?",
      answer: "The success of therapy varies depending on each child's unique situation. However, our tailored approach, experienced therapists, and family-centered care model have resulted in significant progress for many children. We work closely with parents to track milestones and adjust therapy plans to ensure continued success."
  },
  {
      question: "How long will my child need therapy?",
      answer: "The length of therapy depends on your child's specific needs and progress. Some children may benefit from therapy for a few months, while others with more complex developmental issues may require longer-term support. We regularly assess progress and adjust therapy plans to ensure your child is making the most gains possible. We aim to help your child reach their goals as quickly and effectively as possible."
  },
  {
      question: "How involved do I need to be as a parent in my child's therapy?",
      answer: "Your involvement is crucial for your child's success. We encourage parents to participate in therapy sessions when appropriate and to practice recommended activities at home. Our therapists provide guidance on how you can support your child's development outside of the clinic, whether through structured activities or incorporating therapeutic exercises into daily routines. We also offer workshops and resources to help you better understand your child's needs."
  },
  {
      question: "How will I know if therapy is working for my child?",
      answer: "Progress in therapy can be seen in small but meaningful changes over time. Signs of progress may include improvements in speech clarity, motor coordination, social interactions, or behavior. Our therapists will track your child's progress at every session and provide regular updates to keep you informed. We also set clear, measurable goals and adjust the therapy plan as your child grows and develops. Parent feedback is vital, so we encourage you to share any changes you notice at home or in school."
  },
  {
      question: "Does my child need both occupational and speech therapy?",
      answer: "This depends on your child's specific challenges. If your child has difficulties with motor skills, daily living tasks, and sensory regulation, occupational therapy may be recommended. If your child struggles with speech, language, or communication, they may benefit from speech therapy. In some cases, children require both services to address a range of developmental issues. After the initial assessment, we will recommend the most suitable therapy or combination of therapies for your child."
  },
  {
      question: "How do I prepare my child for their first therapy session?",
      answer: "To prepare your child for their first session: Explain that they will be meeting someone who is going to help them learn new things in a fun way; Encourage them to talk about any feelings they have about the visit (excited, nervous, etc.); Ensure they are well-rested and have had something to eat before the session; Bring any necessary documents, medical reports, or previous evaluations that could help the therapist understand your child's background; Dress them in comfortable clothing that allows for movement, especially if they will be participating in physical activities like climbing or balancing."
  }
];

const About = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <>
            <Navbar />
            <main className="px-0 py-12">
                {/* Banner Section */}
                <Banner
                    title="About Us"
                    description="Empowering children through expert pediatric occupational and speech therapy for a brighter, independent future."
                    imageSrc={AboutBanner}
                />

                {/* Mission & Vision Section */}
<section className="relative bg-white py-16 px-4 sm:px-8 md:px-20 lg:px-32">
  <div className="max-w-6xl mx-auto">
    {/* Images Container - Positioned above content */}
    <div className="relative flex justify-center mb-16">
      {/* Left image with decorative element */}
      <div className="relative mr-4 md:mr-12">
        <div className="hidden 2xl:block absolute top-20 -right-100 z-0">
          <Image src={AboutContainer} alt="Background Shape" width={78} height={58} />
        </div>
        <div className="relative z-10">
          <Image
            src={Aboutlink}
            alt="Medical professional with child"
            width={450}
            height={250}
            className="rounded-lg h-80 w-140"
          />
        </div>
        <div className="hidden 2xl:block absolute bottom-[70px] left-[220px]">
          <Image src={AboutContainer2} alt="Background Shape" width={80} height={80} />
        </div>
      </div>

      {/* Right image */}
      <div className="relative ml-4 md:ml-12 mt-30">
        <div className="relative z-10">
          <Image
            src={Aboutlink2}
            alt="Medical professional examining baby"
            width={450}
            height={250}
            className="rounded-lg h-80 w-140"
          />
        </div>
      </div>
      
      {/* Dotted pattern */}
      <div className="absolute right-0 top-15 z-0">
        <DottedPattern/>
      </div>
    </div>

    {/* Text Content - Centered below images */}
    <div className="text-center text-[#245BA7]">
      <h2 className="font-nav_link_font font-normal text-3xl md:text-5xl leading-tight tracking-wide text-[#1E437A] mb-8">
        Mission & Vision
      </h2>

      <p className="font-nav_link_font text-lg md:text-xl leading-relaxed tracking-[0.02em] text-[#456696] max-w-6xl mx-auto">
        The clinic's mission is to empower children to reach their full potential through tailored, evidence-based treatments while providing families with practical strategies and unwavering support. Dr. Shruti, is a seasoned pediatric occupational therapist dedicated to empowering children with neurological and developmental challenges. Dr. Shruti specializes in occupational therapy, particularly in the areas of autism, ADHD, and sensory processing disorders. Her expertise and compassionate approach make her a trusted name in the field, transforming lives and fostering brighter futures for countless families. And Dr. Parul Diwan is an experienced Audiology & Pediatric Speech Therapist, a facility dedicated to diagnosing and treating speech, language, and developmental challenges in children and adults. The clinic addresses a range of issues, including receptive and expressive language disorders, articulation and phonological difficulties, motor speech and fluency disorders, hearing impairments, and voice-related concerns.
        The clinic's mission is to maximize each client's potential by collaborating closely with families and other professionals. The goal is to enhance communication skills, foster social integration, and improve daily life skills, enabling individuals to thrive within society. Innovation, Growth, and Global Reach From pioneering teletherapy services to offering advanced therapy solutions, 8 Senses stands as a beacon of excellence. With a track record of over a decade of success, the clinic has become synonymous with hope, progress, and holistic care. Success Mantra: Tailored Care for Every Child Dr. Patil's and Dr. Diwan's philosophy centers on personalized solutions, swift execution, and a relentless focus on the well-being of children. The clinic not only sets a high standard for care but also contributes to reshaping the future of pediatric occupational therapy globally. Under the leadership of Dr. Patil and Dr. Diwan, 8 Senses Pediatric Occupational Therapy and Speech Therapy clinic continues to be a trusted name for families seeking transformative care and brighter futures for their children.
      </p>
      
      
    </div>
  </div>
</section>

               {/* Meet Our Experts Section */}
<section className="text-center py-16 px-8 md:px-20 lg:px-32 mb-20">
    <h2 className="text-4xl font-semibold text-[#1E437A]">Meet Our Experts</h2>
    <p className="text-[#456696] text-xl mt-4 max-w-2xl mx-auto">
        Dedicated specialists in pediatric occupational and speech therapy, helping children overcome challenges with expert care and compassion.
    </p>

    <div className="flex flex-col md:flex-col justify-center items-center gap-16 mt-16">
        {/* Expert 1 */}
        <div className="text-center max-w-2xl">
            <div className="relative inline-block">
                <Image src={AbtTeam1} alt="Dr. Shruti Patil" width={200} height={200} className="rounded-full mx-auto shadow-lg" />
                <div className="hidden 2xl:block absolute top-15 -left-92 -z-10">
                    <DottedPattern />
                </div>
            </div>
            <h3 className="text-2xl font-semibold text-[#1E437A] mt-6">Dr. Shruti Patil</h3>
            <p className="text-[#456696] font-medium">Pediatric Occupational Therapist</p>
            <p className="text-[#456696] mt-4 text-lg">
<span className='font-bold'>Commitment to Integrity:</span> Dr. Shrruti's commitment to integrity is at the core of everything
she does. From her interactions with patients and colleagues to her professional development
and growth, she upholds the highest standards of professionalism. <br />
<span className='font-bold'>Founding 8 Senses Clinic:</span> One of Dr. Shrruti's greatest achievements is the founding of
8Senses Occupational therapy and Speech therapy Clinic, a pediatric occupational therapy
practice that provides vital services to children in need. Under her leadership, 8 Senses
occupational therapy and Speech therapy Clinic has grown into a respected and successful
practice, transforming the lives of countless children through occupational therapy. <br />

<span className='font-bold'>Recognized Excellence:</span> Dr. Shrruti's contributions to the healthcare industry have been
recognized with numerous awards and accolades, including being named one of the top 50
Power Women visionaries in the field and receiving the entrepreneur of the year award. <br />
<span className='font-bold'>A Heart for Giving Back:</span> Beyond her professional achievements, Dr. Shrruti is passionate
about giving back to her community and making a positive impact in the world. She supports
various causes and charities, always seeking new ways to make a difference.            </p>
        </div>

        {/* Expert 2 */}
        <div className="text-center max-w-2xl">
            <div className="relative inline-block">
                <Image src={AbtTeam2} alt="Dr. Parul Diwan" width={200} height={200} className="rounded-full mx-auto shadow-lg" />
                <div className="hidden 2xl:block absolute -bottom-60 -right-147 -z-10">
                    <DottedPattern />
                </div>
            </div>
            <h3 className="text-2xl font-semibold text-[#1E437A] mt-6">Dr. Parul Diwan</h3>
            <p className="text-[#456696] font-medium">Audiologist & Pediatric Speech Therapist</p>
            <p className="text-[#456696] mt-4 text-lg">
            <span className='font-bold'>Dr. Parul Dedication:</span> Throughout her career, Dr. Parul has been working over a decade in improving the lives of individuals of all her pediatric (children) population through speech therapy. She excels at designing customized treatment plans tailored to the unique needs and goals of her patients while constantly seeking out new and innovative methods to enhance their progress. <br />
 
  <span className='font-bold'>Commitment to Integrity:</span>Dr. Parul's commitment to integrity is at the core of everything she does. From her interactions with patients and colleagues to her professional development and growth, she upholds the highest standards of professionalism.
  
 <br /> <span className='font-bold'>Founding 8 Senses Clinic:</span> One of Dr.Parul's greatest achievements is the founding of 8Senses Occupational therapy and Speech therapy Clinic, a pediatric speech therapy practice that provides vital services to children in need. Under her leadership, 8 Senses occupational therapy and Speech therapy Clinic has grown into a respected and successful practice, transforming the lives of countless children through speech therapy.
  
  
 <br /><span className='font-bold'>Recognized Excellence:</span> Dr. Parul's contributions to the healthcare industry have been recognized with numerous awards and accolades, including being a part of the organising committee in Maharashtra state level speech and hearing conference held in 2022.
  
 <br /><span className='font-bold'>A Heart for Giving Back:</span> Beyond her professional achievements, Dr. Parul is passionate about giving back to her community and making a positive impact in the world. She supports various causes and charities, always seeking new ways to make a difference and is active in the cultural circle
            </p>
        </div>
    </div>
</section>

                {/* Our Journey section - Desktop remains EXACTLY as is */}
<section className="relative bg-white py-16 px-4 sm:px-8 lg:px-32 flex flex-col lg:flex-row items-center gap-12 mb-10">
  {/* Text Content - Unchanged */}
  <div className="relative lg:right-15 w-full lg:w-auto text-center lg:text-left text-[#245BA7]">
    <div className="hidden lg:block absolute lg:ml-[1390px] mt-20 z-10">
      <DottedPattern />
    </div>

    <h2 className="w-full lg:w-[422px] font-nav_link_font font-normal text-3xl lg:text-5xl lg:leading-[65px] flex justify-center lg:justify-start items-center tracking-wide text-[#1E437A] mb-8 lg:mb-[40px] lg:-mt-7">
      Our Journey
    </h2>

    <p className="w-full lg:w-[730px] mx-auto lg:mx-0 font-nav_link_font text-lg lg:text-[22px] lg:leading-[44px] tracking-[0.02em] text-[#456696]">
    Dr. Shruti Patil and Dr. Parul Diwan Co-founders of the 8 Senses Clinic at Nashik started their journey with a deep-rooted desire and commitment to make a meaningful difference in the lives of children with neurological disorders and developmental challenges. Both the doctors are doing their utmost to provide the best care for the patients and have created a space where expert care meets compassion. BODY Established in 2014, 8 Senses has grown from a solo practice to a thriving team of specialists, offering world-class services, including Individualized occupational therapy, Sensory integration therapy, Hand therapy, Neurodevelopmental therapy, autism spectrum disorders, attention deficit hyperactivity disorders, hearing impairment, post cochlear implant rehabilitation, stammering and voice disorders, post laryngectomy rehabilitation etc. 

    </p>

    <div className="flex justify-center lg:justify-start mt-12 lg:mt-23 xl:mt-1">
      
    </div>
  </div>

  {/* Images Container - Hidden on Nest Hub/Max (1024-1279px) */}
  <div className="hidden xl:flex relative flex-col gap-10 items-center lg:items-start">
    <div className="absolute left-[-120px] top-[-170px] w-[376px] h-[507px] flex flex-col items-center">
      <div className="absolute top-[310px] w-[80px] h-[345px] z-10">
        <Image src={AboutContainer2} alt="Background Shape" layout="fill" objectFit="contain" />
      </div>
      <div className="relative flex justify-center items-center w-full h-full z-20">
        <Image
          src={AbtOurJouney1}
          alt="Smiling Baby"
          width={310}
          height={410}
        />
      </div>
    </div>

    <div className="relative left-[250px] top-[70px]">
      <div className="absolute left-[108px] -top-10 -right-4 z-0">
        <Image src={AboutContainer} alt="Background Shape" width={78} height={58} />
      </div>
      <div className="relative z-10">
        <Image
          src={AbtOurJouney2}
          alt="Doctor Smiling"
          width={310}
          height={410}
        />
      </div>
    </div>
  </div>
</section>

                
                {/* FAQ Section - Desktop remains EXACTLY as is */}
<div className="relative bg-white py-20 px-6 md:px-20 lg:px-32 text-white">
  {/* Dotted Pattern - Positioned for all screens */}
  <div className=" absolute top-5 -right-18 mr-15 mt-10 md:top-0 md:right-10 w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
    <DottedPattern />
  </div>

  {/* Heading - Responsive without affecting desktop */}
  <h2 className="text-3xl md:text-4xl lg:text-[54px] font-nav_link_font font-medium text-[#123072] mb-6 md:mb-10">
    Frequently Asked Questions
  </h2>

  {/* FAQ List - Responsive width */}
  <div className="space-y-4 md:space-y-8 -mb-20 md:-mb-36">
    {faqs.map((faq, index) => (
      <div 
        key={index} 
        className="bg-white text-[#456696] rounded-lg border-1 h-fit w-full lg:w-[1300px] mx-auto lg:-ml-3"
      >
        <button
          className="w-full text-lg md:text-xl lg:text-[24px] flex justify-between items-center p-4 md:p-5 text-left font-semibold"
          onClick={() => toggleFAQ(index)}
        >
          <span className="text-[#1E437A]">{faq.question}</span>
          <span className="text-[#456696]">
            {openIndex === index ? <Minus size={24} className="w-5 h-5 md:w-7 md:h-7" /> : <Plus size={24} className="w-5 h-5 md:w-7 md:h-7" />}
          </span>
        </button>
    
        {/* Answer with Fade-in Animation */}
        {openIndex === index && faq.answer && (
          <motion.div
            className="px-4 md:px-5 pb-4 md:pb-5 text-[#456696] text-base md:text-lg lg:text-[20px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {faq.answer}
          </motion.div>
        )}
      </div>
    ))}
  </div>
</div>
   
            </main>
            <div >
            <Consultation />
            </div>
            <Footer />
        </>
    );
};

export default About;