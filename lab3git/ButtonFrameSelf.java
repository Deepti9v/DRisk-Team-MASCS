import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

/*
  To change from the delegation method (method 1; the original
  technique of event handling for ButtonFrame) to method 2
  (the object serves as its own listener), simply move the 
  event handling methods (the ones on the listener interfaces)
  into ButtonFrame (renamed ButtonFrameSelf here). The only 
  catch is that you cannot extend WindowAdapter now, so you
  will have to add all the empty methods of interface WindowListener.
*/
public class ButtonFrameSelf extends JFrame
    implements ActionListener, WindowListener
{
    // move the count class variable into this class
    private int count = 0;

    public ButtonFrameSelf()
    {
	JButton open = new JButton("Open");
	JButton close = new JButton("Close");
	
	open.addActionListener(this);
	close.addActionListener(this);
	
	Container pane = getContentPane();
	pane.setLayout(new FlowLayout());
	pane.add(open);
	pane.add(close);
	
	addWindowListener(this);
	setSize(200, 100);
	setVisible(true);
    }

    public static void main(String args[])
    {
	JFrame f = new ButtonFrame();
    }

    public void actionPerformed(ActionEvent e)
    {
	System.out.println("Button pressed (" + count++ + ") " + 
			   e.getActionCommand());
    }

    public void windowClosing(WindowEvent we)
    {
	System.out.println("Application exiting");
	System.exit(0);
    }

    // and these are all the other methods inherited from
    // interface WindowListener that we have to provide
    // empty implementations for...
    public void windowOpened(WindowEvent we) {}
    public void windowIconified(WindowEvent we)  {}
    public void windowDeiconified(WindowEvent we)  {}
    public void windowClosed(WindowEvent we)  {}
    public void windowActivated(WindowEvent we) {}
    public void windowDeactivated(WindowEvent we) {}
}



