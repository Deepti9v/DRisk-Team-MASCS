public class Main {
	public static void main(String [ ] args)
	{
		TestRollDice();
		TestAttack();		
	}
	
	public static void TestRollDice()
	{
		CommonMethods cm = new CommonMethods();
		for(int i = 0; i < 10; i++)
			System.out.print(cm.RollDice() + " ");
		System.out.println();
	}
	
	public static void TestAttack()
	{
		Army a = new Army(10);
		Army b = new Army(4);		
		Attack at = new Attack();
		at.Combat(a, b);
	}
}
