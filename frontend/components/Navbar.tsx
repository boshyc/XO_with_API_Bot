import Link from "next/link";
export default function Navber () {
    return (
    <div className="bg-nav" >
        <nav>
            <ul>
                <li><Link href={'/'}><button className="xo-button">XO Game!</button></Link></li>
                <li><Link href={'/history'}><button className="history-button">History</button></Link></li>
            </ul>
        
        </nav>
    
    </div>
      );
}