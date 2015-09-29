import java.util.Random;

public class CommonMethods {
	/**
	 * Rolling a dice
	 * @return a integer between 1 & 6
	 */
	public int RollDice()
	{
    	Random rand = new Random();
    	int randomNum = rand.nextInt((6 - 1) + 1) + 1;
    	return randomNum;
	}
	
	//TODO
	public int DrawCard()
	{
		return 0;
	}
	
	/**
	 * Similar functionality as String.Join() in C#
	 * @param arr
	 * @return concatenated string
	 */
	public String ArrayContant(int[] arr, String deli)
	{
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < arr.length; i++)
			sb.append(arr[i] + deli);
		return sb.toString();
	}
}
