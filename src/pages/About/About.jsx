import { LinkedInIcon, GitHubIcon } from '../../assets/icons';
import skills from '../../assets/data/skills.json';
import styles from './About.module.scss';
import ContentBox from '../../components/ContentBox/ContentBox';
import Pills from '../../components/Pills/Pills';
import IconLink from '../../components/IconLink/IconLink';
import Footer from '../../components/Footer/Footer';

export function About() {
  return (
    <section className={styles.about}>
      <img
        className={`${styles.picture} ${styles.top}`}
        src='/spa.webp'
        alt="It's me at spa"
      />
      <img
        className={`${styles.picture} ${styles.bottom}`}
        src='/eskimo.webp'
        alt="It's me as eskimo"
      />

      <ContentBox className={styles.contentBox}>
        <h2>Hello</h2>
        <p>
          I&apos;m a girl{' '}
          <span role='img' aria-label='girl emoji'>
            💁‍♀️
          </span>
          , born in the beginning of the 90&apos;s, in between the deepest
          forests of Norway, surrounded by fields of grains,{' '}
          <span role='img' aria-label='grain emoji'>
            🌾
          </span>{' '}
          where moose and deer are your nearest friends{' '}
          <span role='img' aria-label='deer emoji'>
            🦌
          </span>
          , and signal suits are fashion.
          <br />
          <br />
          During a play about the solar system in elementary school, where I got
          the honor of being dressed up as Tellus{' '}
          <span role='img' aria-label='earth emoji'>
            🌍
          </span>
          , I discovered my love for space which triggered my curiosity for
          natural science. Around the same time, I got caught in the piczo.com
          universe where I knocked myself out, making meaningless websites about
          everything from celebrities to killer whales{' '}
          <span role='img' aria-label='whale emoji'>
            🐳
          </span>
          .
          <br />
          <br />I ended up following my inner scientist after finishing high
          school, but after completing a degree which involved staring at lines
          and lines of equations{' '}
          <span role='img' aria-label='nerd emoji'>
            🤓
          </span>
          , I found my creativity neurons screaming{' '}
          <span role='img' aria-label='skull emoji'>
            💀
          </span>
          . So I decided to pick up my child hood career as a web developer.
          <br />
          <br />
          Now here I am, happily living off of turning my own, and others&apos;,
          sketches into living things on the internet.
          <span role='img' aria-label='artist emoji'>
            👩‍🎨💻
          </span>
          <br />
          <br />
          And I&apos;m loving it{' '}
          <span role='img' aria-label='heart emoji'>
            💖
          </span>
        </p>

        <img
          className={styles.catGif}
          src='/programming-cat.gif'
          alt='Programming cat'
        />

        <img className={styles.pinkyGif} src='/pinky.gif' alt='Pinky hair' />

        <h3 className={styles.subHeading}>Some of my skills</h3>
        {skills &&
          Object.entries(skills).map((skillset, index) => {
            return (
              <Pills
                key={index}
                titleLevel={4}
                title={skillset[0]}
                items={skillset[1]}
              />
            );
          })}

        <h3 className={styles.subHeading}>Contact or stalk</h3>

        <ul className={styles.contactList}>
          <li>
            <IconLink
              href='https://linkedin.com/in/jenny-bonsak'
              IconComponent={<LinkedInIcon />}
              label='LinkedIn'
            />
          </li>
          <li>
            <IconLink
              href='https://github.com/jennur'
              IconComponent={<GitHubIcon />}
              label='Github'
            />
          </li>
        </ul>
      </ContentBox>
      <Footer />
    </section>
  );
}

export default About;
