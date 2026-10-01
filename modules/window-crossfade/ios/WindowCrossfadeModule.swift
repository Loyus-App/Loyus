import ExpoModulesCore
import UIKit

public class WindowCrossfadeModule: Module {
  private var snapshot: UIView?

  public func definition() -> ModuleDefinition {
    Name("WindowCrossfade")

    AsyncFunction("cover") {
      guard let window = Self.keyWindow, let snapshot = window.snapshotView(afterScreenUpdates: false) else {
        return
      }
      snapshot.frame = window.bounds
      snapshot.isUserInteractionEnabled = false
      window.addSubview(snapshot)
      self.snapshot?.removeFromSuperview()
      self.snapshot = snapshot
    }
    .runOnQueue(.main)

    AsyncFunction("reveal") { (durationMs: Double) in
      guard let snapshot = self.snapshot else {
        return
      }
      self.snapshot = nil
      UIView.animate(
        withDuration: durationMs / 1000,
        delay: 0,
        options: [.curveEaseInOut, .beginFromCurrentState],
        animations: { snapshot.alpha = 0 },
        completion: { _ in snapshot.removeFromSuperview() }
      )
    }
    .runOnQueue(.main)
  }

  private static var keyWindow: UIWindow? {
    UIApplication.shared.connectedScenes
      .compactMap { $0 as? UIWindowScene }
      .flatMap(\.windows)
      .first(where: \.isKeyWindow)
  }
}
