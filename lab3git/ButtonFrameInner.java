import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/*
  To change from the delegation method (method 1; the original
  technique of event handling for ButtonFrame) to the inner class
  technique, simply move the ButtonListener and ButtonCloser
  classes inside ButtonFrame (called ButtonFrame Inner here)
  and make them private.
*/
public class ButtonFrameInner extends JFrame
{
	public ButtonFrameInner()
	{
		JButton open = new JButton("Open");
		JButton close = new JButton("Close");
		ActionListener listener = new ButtonListener();

		open.addActionListener(listener);
		close.addActionListener(listener);

		Container pane = getContentPane();
		pane.setLayout(new FlowLayout());
		pane.add(open);
		pane.add(close);

		addWindowListener(new ButtonCloser());
		setSize(200, 100);
		setVisible(true);
	}

	public static void main(String args[])
	{
		JFrame f = new ButtonFrame();
	}

    private class ButtonListener implements ActionListener
    {
	int count = 0;
	public void actionPerformed(ActionEvent e)
	{
	    System.out.println("Button pressed (" + count++ + ") " + 
			       e.getActionCommand());
	}
    }

    private class ButtonCloser extends WindowAdapter
    {
	public void windowClosing(WindowEvent we)
	{
	    System.out.println("Application exiting");
	    System.exit(0);
	}
    }

}
