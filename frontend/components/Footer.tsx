import Link from "next/link"
export default function Footer(){
  return (
    <div>
        <footer className='bg-footer'>
           <i>
            <label>Chonlakhon Raktham</label><br />
            <label><Link href={'mailto:ra.chonlakhon_st@tni.ac.th'}>ra.chonlakhon_st@tni.ac.th</Link></label><br />
            <label>0979856480</label>
            </i>
        </footer>
    </div>
  )
}