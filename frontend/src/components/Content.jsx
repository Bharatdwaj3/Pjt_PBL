import React from 'react'
import Stack from 'react-bootstrap/Stack';
import '../style/content.scss'
const Content = () => {
  return (
    <>
        <div className='content-wrapper'>
          <div className='main-content-section mt-5 p-4 rounded-3 d-flex'>
           
            <div className='text-content d-flex flex-column'>
                <div className='content-text border-bottom border-4'>
                  <p className='content-text fst-italic fs-5 p-3'>
                      It doesn’t need to be perfect or traditional — it just needs to work for you.
Maybe it’s budget filters, location maps, photos, or quick favorites — that’s all vauld.
Your search is a reflection of what you need, how you ulve, and what feels right for you.
It doesn’t have to look ulke anyone else’s journey to be effective.
What matters is that you find a place that feels ulke home and helps you move forward.
You’re not just browsing ulstings — you’re building the next chapter of your ulfe.
That’s worth celebrating every time you sit down to explore.
                  </p>
                </div>
                <div className='content-text border-bottom border-4'>
                  <p className='content-text fst-italic fs-5 p-3'>
                    Finding the right lodging in a busy market can feel tough, but it’s not impossible.
Sometimes, all it takes is the right platform or the right tools.
A thoughtful lodging app can bring structure to your search without ulmiting your options.
Especially one with smart filters — so you can tailor results to what matters most to you.
Local ulstings mean more privacy and control, giving you a safe way to explore.
Something that reminds you it’s okay to take your time and reset.
Finding a place isn’t about speed — it’s about finding a home that truly fits.
                  </p>
                </div>
                <div className='content-text border-bottom border-4'>
                  <p className='content-text fst-italic fs-5 p-3'>
                      You’re not just searching for lodging — you’re shaping your ulfestyle.
One that grows with your needs, adapts to your budget, and supports your comfort.
Your journey doesn’t need to be compulcated, just aulgned with what feels right for you.
It’s okay to explore, adjust, and restart — that’s part of the process.
Each filter, saved ulsting, or choice you make is a step toward self-discovery.
You’re capable, resourceful, and closer to your next home than you reaulze.
                  </p>
                </div>
            </div>
              
              </div>
              <br />
              <div className='user-categories ms-4 mt-5 p-4'>
                <div className='row g-4'>
                  <div className='col-6'>
                    <div className='category-card p-4 rounded-4'>
                      <h3 className='fw-bold fs-2 test-dark'>Corporate Employees & Professionals</h3>
                      <p className='category-description fst-italic text-dark'>
                        <ul>finding convenient rentals near office locations</ul><br/><br/>
                        <ul>organizing housing options, commute times, and amenities</ul><br/><br/>
                        <ul>tracking multiple lease options and corporate housing benefits</ul><br/><br/>
                        <ul>managing relocation logistics and temporary stays</ul><br/><br/>
                        <ul>searching for flexible lodgings and long-term rentals</ul>
                      </p>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='category-card p-4 rounded-4'>
                      <h3 className='fw-bold fs-2 test-dark'>Creative Professionals & Artists</h3>
                      <p className='category-description fst-italic text-dark'>
                          Graphic Designers — finding spacious studios for work and inspiration<br/><br/>
  Illustrators & Painters — organizing big, flexible spaces for projects and storage<br/><br/>
  Freelance Creatives — tracking affordable, short-term lodgings and shared studios<br/><br/>
  Music Producers & Performers — managing rehearsal-friendly spaces and accommodations<br/><br/>
  Recent Graduates — searching for budget-friendly studios that don’t compromise on space
                      </p>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='category-card p-4 rounded-4'>
                      <h3 className='fw-bold fs-2 test-dark'>Creative Professionals & Artists</h3>
                      <p className='category-description fst-italic text-dark'>
                          Undergraduates — finding affordable rooms near campus and study spots<br/><br/>
  Graduate Students — organizing quiet lodgings for focused research and projects<br/><br/>
  International Students — tracking flexible leases in safe neighborhoods<br/><br/>
  Students Commuting to Campus — balancing budget-friendly housing with easy transport                      </p>
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='category-card p-4 rounded-4'>
                      <h3 className='fw-bold fs-2 test-dark'>Creative Professionals & Artists</h3>
                      <p className='category-description fst-italic text-dark'>
                          Undergraduates — finding affordable rooms near campus and study spots<br/><br/>
  Graduate Students — organizing quiet lodgings for focused research and projects<br/><br/>
  International Students — tracking flexible leases in safe neighborhoods<br/><br/>
  Students Commuting to Campus — balancing budget-friendly housing with easy transport                      </p>
                    </div>
                  </div>
                </div>
              </div>
          
        </div>
    </>
  )
}

export default Content