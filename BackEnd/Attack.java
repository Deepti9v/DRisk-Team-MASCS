import java.util.Arrays;

public class Attack
{
	private static final String arrDeli = " ";
	
	/**
	 * Combat between two armies
	 * @param a attacking army
	 * @param b defending army
	 * @return the army that wins the combat
	 */
	public Army Combat(Army a, Army b)
	{
		CommonMethods cm = new CommonMethods();
		int[] attack, defend;
		while (a.getTroop() > 0 && b.getTroop() > 0)
		{
			System.out.println("----------");
			attack = new int[]{ cm.RollDice(), cm.RollDice(), cm.RollDice() };
			defend = new int[]{ cm.RollDice(), cm.RollDice() };
			Arrays.sort(attack);
			System.out.println("Army A dice: " + cm.ArrayContant(attack, arrDeli));
			Arrays.sort(defend);
			System.out.println("Army B dice: " + cm.ArrayContant(defend, arrDeli));
			
			//compare highest die
			if (attack[2] > defend[1])
				b.setTroop(b.getTroop() - 1);
			else if (attack[2] < defend[1])
				a.setTroop(a.getTroop() - 1);
			
			//break the loop if one army reaches 0
			if (a.getTroop() == 0 || b.getTroop() == 0)
				break;
			
			//compare 2nd highest die
			if (attack[1] > defend[0])
				b.setTroop(b.getTroop() - 1);
			else if (attack[1] < defend[0])
				a.setTroop(a.getTroop() - 1);
		}
		
		System.out.println("-----Final Count-----");
		System.out.println("Army A: " + a.getTroop());
		System.out.println("Army B: " + b.getTroop());		
		
		if (a.getTroop() >0) return a;
		else return b;
	}
}
